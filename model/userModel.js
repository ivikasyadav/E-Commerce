const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        requires:true,
    },
    passwrod:{
        type:String,
        requires:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

module.exports=mongoose.model("user",userSchema)