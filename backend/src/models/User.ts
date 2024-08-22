import { Schema,model } from "mongoose";

const userSchema:Schema = new Schema({
    name:{
     type:String,
     required:true,   
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    }
})

export default model("User",userSchema)

