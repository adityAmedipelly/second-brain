import express from "express"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { usermiddleware } from "./middleware"
import { Usermodel,Contentmodel } from "./db"
import { JWT_PASSWORD } from "./config"
const app = express()
app.use(express.json())


app.post ("/api/v1/signup",async(req,res) => {
    // zod and has i have to do
   try{
    const username =req.body.username
    const password = req.body.password;
    const email = req.body.email

    await Usermodel.create({
        username:username,
        password:password,
        email:email
     })

     res.json({
        message:"user is login "
     })
   }catch (e){
    res.status(411).json({
        message:"user already exit"
    })

   }
   

})

app.post("/api/v1/signin",async(req,res)=> {

    const username = req.body.username;
    const password = req.body.password

    const exituser = await Usermodel.findOne({
        username,
        password
    })

    if( exituser){
        const token = jwt.sign({
            id: exituser._id
        },JWT_PASSWORD)

        res.json({
            token
        })
     
    } else{
        res.status(403).json({
            message:"incorect ceridetionals"
        })
    }


})

app.post("/api/v1/content",usermiddleware, async(req,res)=>{

    const link = req.body.link;
    const type = req.body.type;

    await Contentmodel.create({
        link,
        type,
        //@ts-ignore
        userId:req.userId,
        tags:[]

    })

     res.json({
    message:"content is added"
   })

})

app.get("api/v1/content",usermiddleware, async(req,res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content = await Contentmodel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })


})

app.delete("api/v1/content",usermiddleware,async(req,res)=>{

    const contentId = req.body.contentId;

    await Contentmodel.deleteMany({
        contentId,
        //@ts-ignore
        userId : req.userId

    })

    res.json({
        message:"deleted susefully"
    })

})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("api/v1/brain/:shareLink",(req,res)=>{

})

app.listen(3000);
