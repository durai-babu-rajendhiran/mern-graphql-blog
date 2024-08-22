import { Schema,model } from "mongoose";

const commentSchema:Schema = new Schema({
    text:{
     type:String,
     required:true,   
    },
    date:{
        type:Date,
        required:true
    }
})

export default model("Comment",commentSchema)

