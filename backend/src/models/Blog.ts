import { Schema,model } from "mongoose";

const blogSchema:Schema = new Schema({
    title:{
     type:String,
     required:true,   
    },
    content:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    }
})

export default model("Blog",blogSchema)

