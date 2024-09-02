import { Schema,model } from "mongoose";

const commentSchema:Schema = new Schema({
    text:{
     type:String,
     required:true,   
    },
    date:{
        type:Date,
        required:true
    },
    user: { type:Schema.Types.ObjectId, ref: 'User' },
    blog: { type:Schema.Types.ObjectId, ref: 'Blog' }
})

export default model("Comment",commentSchema)

