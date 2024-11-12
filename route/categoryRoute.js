const mongoose=require("mongoose")
const categoryModel=require("../model/category")
const express=require("express")
const router=express.Router()

router.post("/createcategory",async(req,res)=>{
    try{
        const {name}=req.body
        const cat=await categoryModel.findOne({name})
        if(cat){
            return res.send({
                message:"category already exist"
            })
        }
        console.log("1")
        const newc=new categoryModel({name})
        await newc.save()
        res.send({
            success:true,
            message:"category created successfully"
        })
    }catch(err){
        console.log(err)
    }
})

router.get("/allcategory",async(req,res)=>{
    try{
        const data=await categoryModel.find({})
        res.send({
            message:"all data fetched",
            data
        })
    }catch(err){
        console.log(err)
    }
})

router.get("/singlecategory/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const cat=await categoryModel.findById(id)
        if(!cat){
            return res.send({
                message:"category not found"
            })
        }
        res.send({
            success:true,
            message:"Category found",
            cat
        })
    }catch(err){
        console.log(err)
    }
})

router.delete("/deletecategory/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const cat=await categoryModel.findById(id)
        if(!cat){
            return res.send({
                message:"category not found"
            })
        }
        const del=await categoryModel.findByIdAndDelete(id)
        if(del){
            return res.send({
                message:"CAtegory deleter]"
            })
        }else{
            res.send({
                message:"not deleted"
            })
        }
    }catch(err){
        console.log(err)
    }
})

router.put("/updatecategory/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const {name}=req.body
        const cat=await categoryModel.findByIdAndUpdate(id,{name},  { new: true, runValidators: true }) 
        if(cat){
            return res.send({
                message:"Category updated",
                cat
            })
        }
    }catch(err){
        console.log(err)
    }
})


module.exports=router