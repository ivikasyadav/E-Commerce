const express=require("express")
const app=express()
const ConnectDB=require("./config/db")
const dotenv=require("dotenv")
const userRoute=require("./route/userRoute")
const categoryRoute=require('./route/categoryRoute')
const productRoute=require("./route/productroute")
const path = require('path');

const cors=require("cors")


dotenv.config()
ConnectDB()
app.use(express.json())
app.use(cors())

app.get("/home",(req,res)=>{
    res.send("Welcome to home page")
})
app.use("/api/v1",userRoute)
app.use("/api/v1",categoryRoute)
app.use("/api/v1",productRoute)


// app.use(express.static(path.join(__dirname,"./client/build")))
// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get("*",function(req,res){
//     res.sendFile(path.join(__dirname,"./client/build/index.html"))

// })
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });
const buildPath = path.join(__dirname, "", "build");
app.use(express.static(buildPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
});



const port=process.env.PORT || 4000

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
