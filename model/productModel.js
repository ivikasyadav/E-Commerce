const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    quantity:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    }
})

module.exports=mongoose.model("Products",productSchema)