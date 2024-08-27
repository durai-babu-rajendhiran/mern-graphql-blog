import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { GraphQLID } from 'graphql';
import { BlogType, commentType, UserType } from '../schema/schema';
import User from '../models/User';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import { Document } from 'mongoose';
import { hashSync,compareSync } from 'bcryptjs';

type DocumentType=Document<any,any,any>
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
            type: GraphQLList(commentType),
            async resolve() {
                return await Comment.find();
            }
        }
    }
});

const  mutations = new GraphQLObjectType({
    name:"mutations",
    fields:{
        signup:{
            type:UserType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                email:{type:GraphQLNonNull(GraphQLString)},
                password:{type:GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,{name,email,password}){
                let existingUser:DocumentType;
                try {
                    existingUser = await User.findOne({email:email})
                    if(existingUser) return new Error("user Already Exists");
                    const encrptedPassword = hashSync(password);
                    const user  = new User({name,email,password:encrptedPassword});
                    return await user.save()
                } catch(err){
                    return new Error("User SignUp Failed. try Again")
                }
            }
        },
        login:{
            type:UserType,
            args:{
                email:{type:GraphQLNonNull(GraphQLString)},
                password:{type:GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,{email,password}){
                let existingUser:DocumentType;
                try {
                    existingUser = await User.findOne({email:email})
                    if(!existingUser) return new Error("user Not Exists");
                    const decryprted =compareSync(password,
                        //@ts-ignore
                        existingUser?.password)
                    if(!decryprted) return new Error("Incorrect Password")
                    return existingUser;
                } catch(err){
                    return new Error(err)
                }
            }
        },
        addBlog:{
            type:BlogType,
            args:{
                title:{type:GraphQLNonNull(GraphQLString)},
                content:{type:GraphQLNonNull(GraphQLString)},
                date:{type:GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent,{title,content,date}){
                let blog:DocumentType
                try{
                    blog = new Blog({title,content,date});
                    return await blog.save()
                } catch(err){
                    return new Error(err)
                }
            }
        },
        updateBlog:{
            type:BlogType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
                title:{type:GraphQLNonNull(GraphQLString)},
                content:{type:GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent,{title,content,id}){
                let existingBlog:DocumentType
                try{
                    existingBlog = await Blog.findById(id);
                    if(!existingBlog) return new Error("Blog doesn`t Exists")
                    return await Blog.findByIdAndUpdate(id,{title,content},{new:true});
                } catch(err){
                    return new Error(err)
                }
            },
        },
        deleteBlog:{
            type:BlogType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            async resolve(parent,{id}){
                let existingBlog:DocumentType
                try{
                    existingBlog = await Blog.findById(id);
                    if(!existingBlog) return new Error("Blog doesn`t Exists")
                    return await Blog.findByIdAndDelete(id);
                } catch(err){
                    return new Error(err)
                }
            },
        },
    }
})

export default new GraphQLSchema({query:RootQuery,mutation:mutations});