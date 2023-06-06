const express=require("express");
const app=express();
const {auth}=require("./middlewares/autherization")
const {connection}=require("./config/config");
const {Userrouter,Postrouter}=require("./routes/protected")
const {postrouter}=require("./routes/nonprotected")
require('dotenv').config()
const {userrouter}=require("./routes/credential.route")
app.use(express.json());

const swaggerjsdoc=require("swagger-jsdoc");
const swaggerui=require("swagger-ui-express");

//=============================================>
const options={
    definition:{
        openapi: "3.0.0",
        info:{
            title:"social media api doc",
            version:"0.1",
            description:
            "This is social media backend where persn can login register ,like comments and send friend request , accept friend request , post anything and delete it and update it also ",
            contact:{
                name:"sriram",
                CourseID:"fw22_0103",
                email:"sriramalavalapatiit01@gmail.com"
            }

        },
        servers:[
            {
                url:"https://mock9-1s9j.onrender.com/"
            },
        ],
    },
    apis:["./routes/*.js"]
}

app.use("/api",userrouter,postrouter)
app.use(auth);
app.use("/api",Userrouter,Postrouter)



const spacs=swaggerjsdoc(options);
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))


//=============================================================>


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`server running at ${process.env.port} \n database connected`)
    } catch (error) {
        console.log(error.message)
    }
})