import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import { GraphQLID } from 'graphql';
import { BlogType, commentType, UserType } from '../schema/schema';
import User from '../models/User';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import { Document } from 'mongoose';
import { hashSync,compareSync } from 'bcryptjs';
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
                let existingUser:Document<any,any,any>;
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
                let existingUser:Document<any,any,any>;
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
        }
    }
})

export default new GraphQLSchema({query:RootQuery,mutation:mutations});