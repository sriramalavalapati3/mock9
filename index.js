const express=require("express");
const app=express();
const {auth}=require("./middlewares/autherization")
const {connection}=require("./config/config");
const {Userrouter,Postrouter}=require("./routes/protected")
const {postrouter}=require("./routes/nonprotected")
require('dotenv').config()
const {userrouter}=require("./routes/credential.route")
app.use(express.json());



app.use("/api",userrouter,postrouter)
app.use(auth);
app.use("/api",Userrouter,Postrouter)







app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`server running at ${process.env.port} \n database connected`)
    } catch (error) {
        console.log(error.message)
    }
})