import mongoose, { Mongoose } from "mongoose"
import {model,Schema} from "mongoose"

mongoose.connect("mongodb+srv://aditya:5QoZaHnDA3Pv6ltW@cluster0.qqyta.mongodb.net/brainly")

const User = new Schema({
    username : {type:String, unique:true},
    email : {type:String, unique:true},
    password : String,
})

const Content = new Schema({
    title : String,
    link: String,
    tags : [{type : mongoose.Types.ObjectId,ref: 'Tag'}],
    userId : {type:mongoose.Types.ObjectId,ref:'User',require:true}
})



export const  Usermodel = mongoose.model("User",User)
export const  Contentmodel = mongoose.model("Content",Content)