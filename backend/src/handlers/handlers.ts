import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { GraphQLID } from 'graphql';
import { BlogType, CommentType, UserType } from '../schema/schema';
import User from '../models/User';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import { Document, startSession } from 'mongoose';
import { hashSync, compareSync } from 'bcryptjs';
import mongoose from 'mongoose';

type DocumentType = Document<any, any, any>
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        users: {
            type: GraphQLList(UserType),
            async resolve() {
                return await User.find({}).exec();
            }
        },
        blogs: {
            type: GraphQLList(BlogType),
            async resolve() {
                return await Blog.find();
            }
        },
        comments: {
            type: GraphQLList(CommentType),
            async resolve() {
                return await Comment.find();
            }
        }
    }
});

const mutations = new GraphQLObjectType({
    name: "mutations",
    fields: {
        signup: {
            type: UserType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, { name, email, password }) {
                let existingUser: DocumentType;
                try {
                    existingUser = await User.findOne({ email: email })
                    if (existingUser) return new Error("user Already Exists");
                    const encrptedPassword = hashSync(password);
                    const user = new User({ name, email, password: encrptedPassword });
                    return await user.save()
                } catch (err) {
                    return new Error("User SignUp Failed. try Again")
                }
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, { email, password }) {
                let existingUser: DocumentType;
                try {
                    existingUser = await User.findOne({ email: email })
                    if (!existingUser) return new Error("user Not Exists");
                    const decryprted = compareSync(password,
                        //@ts-ignore
                        existingUser?.password)
                    if (!decryprted) return new Error("Incorrect Password")
                    return existingUser;
                } catch (err) {
                    return new Error(err)
                }
            }
        },
        addBlog: {
            type: BlogType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                content: { type: GraphQLNonNull(GraphQLString) },
                date: { type: GraphQLNonNull(GraphQLString) },
                user: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, { title, content, date, user}) {
                let blog: DocumentType
                try {
                    blog = new Blog({ title, content, date,user});
                    return await blog.save()
                } catch (err) {
                    return new Error(err)
                }
            }
        },
        updateBlog: {
            type: BlogType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLNonNull(GraphQLString) },
                content: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, { title, content, id }) {
                let existingBlog: DocumentType
                try {
                    existingBlog = await Blog.findById(id);
                    if (!existingBlog) return new Error("Blog doesn`t Exists")
                    return await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
                } catch (err) {
                    return new Error(err)
                }
            },
        },
        deleteBlog: {
            type: BlogType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            async resolve(parent, { id }) {
                let existingBlog: DocumentType
                try {
                    existingBlog = await Blog.findById(id);
                    if (!existingBlog) return new Error("Blog doesn`t Exists")
                    return await Blog.findByIdAndDelete(id);
                } catch (err) {
                    return new Error(err)
                }
            },
        },
        //add Comment to blog
        addCommentToBlog: {
            type: CommentType,
            args: {
                blog: { type: GraphQLNonNull(GraphQLID) },
                user: { type: GraphQLNonNull(GraphQLID) },
                text: { type: GraphQLNonNull(GraphQLString) },
                date: { type: GraphQLNonNull(GraphQLString) },
            },
            async resolve(parent, { user, blog, text, date }) {
                try {
                    // Validate IDs
                    if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(blog)) {
                        throw new Error("Invalid User or Blog ID");
                    }

                    // Query the database
                    const existingUser = await User.findById(user);
                    const existingBlog = await Blog.findById(blog);

                    if (!existingUser || !existingBlog) {
                        throw new Error("User or Blog Does Not Exist");
                    }

                    // Create and save the comment
                    const comment = new Comment({ text, date, blog, user });
                    await comment.save();

                    // Add the comment to the User and Blog
                    // @ts-ignore
                    existingUser.comments.push(comment._id);
                    // @ts-ignore
                    existingBlog.comments.push(comment._id);

                    await existingUser.save();
                    await existingBlog.save();

                    return comment;
                } catch (err) {
                    throw new Error(err.message || "Failed to add comment");
                }
            }
        },
        //delete comment
        deleteComment: {
            type: CommentType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, { id }) {
                let comment: DocumentType
                try {
                    // Find the comment by id
                    comment = await Comment.findById(id);
                    if (!comment) {
                        throw new Error("Comment not found");
                    }

                    // Find the user associated with the comment
                    // @ts-ignore
                    const existingUser = await User.findById(comment.user);
                    if (!existingUser) {
                        throw new Error("User not found");
                    }

                    // Find the blog associated with the comment
                    // @ts-ignore
                    const existingBlog = await Blog.findById(comment.blog);
                    if (!existingBlog) {
                        throw new Error("Blog not found");
                    }

                    // Remove the comment reference from the user and blog
                    // @ts-ignore
                    existingUser.comments.pull(comment._id);
                    // @ts-ignore
                    existingBlog.comments.pull(comment._id);

                    // Save the user and blog
                    await existingUser.save();
                    await existingBlog.save();

                    // Delete the comment
                    await comment.deleteOne();

                    return comment;
                } catch (err) {
                    // Log the error for debugging
                    console.error(err);
                    // Return a GraphQL error object
                    throw new Error(`Failed to delete comment: ${err.message}`);
                }
            }
        }
    }
})

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });