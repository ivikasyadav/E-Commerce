const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const userModel=require("../model/userModel")
const bcrypt=require("bcrypt")
const JWT=require("jsonwebtoken")
const { signin, isAdmin } = require("../middleware/middleware")



//__________________________________________________________Register Route_____________________________________________________
router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name || !password ||  !email) return res.send({message:"All fields are requires"})

        const exuser=await userModel.findOne({email})
        if(exuser){
            return res.send({
                message:"Email already exist",
                exuser
            })
        }
        const hash=await bcrypt.hash(password,10)
        const user=new userModel({name,email,passwrod:hash})
        await user.save()
        return res.send({
            success:true,
            message:"New user added"
        })
          
    }catch(err){
        res.send({
            success:false,
            message:"Error in user register",
        })
        console.log(err)
    }
})
//__________________________________________________________Login Route_____________________________________________________

router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.send({
                messge:"Email is not register"
            })
        }
     
        const ismatch=await bcrypt.compare(password,user.passwrod)
       
        if (!ismatch){
            return res.send({
                message:"Password is incorrect"
            })
        }
        const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET)
        res.send({
            success:true,
            message:"Login Successfull",
            token,
            users:user
        })
    }catch(err){
        res.send({
            message:"erro in user login"
        })
        console.log(err)
    }
})

//____________________________________________________________________MiddlewRE________________________________

router.get("/md",signin,isAdmin,(req,res)=>{
    res.send("Hello")
})





module.exports=router