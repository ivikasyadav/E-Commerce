const mongoose=require("mongoose")
const JWT=require("jsonwebtoken")
const userModel=require("../model/userModel")

const signin=async(req,res,next)=>{
    try{
        const ver=await JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=ver
        next()
    }
    catch(err){
        console.log(err)
    }
}

const isAdmin=async(req,res,next)=>{
    try{
        const user= await userModel.findById(req.user)
        
        if(user.role!==1){
            return res.send({
                message:"unauthorized",
                users:req.user
            })
        }
        next()
    }catch(err){
        console.log(err)
    }
}




module.exports={isAdmin,signin}