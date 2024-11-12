const mongoose=require("mongoose")

const categoryScahema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

module.exports=mongoose.model("category",categoryScahema)