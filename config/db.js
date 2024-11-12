const mongoose=require("mongoose")

const ConnectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err){
        console.log(err,"error in databse")
    }
}


module.exports=ConnectDB