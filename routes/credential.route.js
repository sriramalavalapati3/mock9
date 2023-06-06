const express=require("express")

const userrouter=express.Router();
const {Usermodel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {auth}=require("../middlewares/autherization")
//This endpoint should allow users to register. Hash the password on store.

userrouter.post("/register",async(req,res)=>{
    const {name,email,password,dob,bio}=req.body
    try {
        bcrypt.hash(password, 3, async function(err, hash) {
            if(!err)
            {
              let userdata= new Usermodel({name,email,password:hash,dob,bio})
              await userdata.save();
              res.status(201).send("Registered successfully")
            }else{
                res.send("something went wrong while register")
            }
        }); 
    } catch (error) {
        res.send(error.message)
    }
})

//This endpoint should allow users to login. Return JWT token on successful login.

userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
     
         const user=await Usermodel.findOne({email})
         if(user){
         bcrypt.compare(password, user.password, function(err, result) {
         if(result){
         const token = jwt.sign({userID:user._id},process.env.token);
        
        
         res.status(201).send({"msg":"Login Successfull","token":token})
         } else {res.send("Wrong Credntials")}
         });
         } else {
         res.send("Wrong Credntials")
         }
         }
     catch (error) {
     res.send(`Something went wrong \n ${error.message}`)
 
 
    }
})

// This endpoint should return a list of all registered users. 

userrouter.get("/users",async(req,res)=>{
    try {
let data=await Usermodel.find({})
res.send(data)
    } catch (error) {
       res.send(error.message) 
    }
})

//This endpoint should return a list of all friends of a specific user identified by its ID.

userrouter.get("/users/:id/friends",async(req,res)=>{
    let id=req.params.id
    try {
let data=await Usermodel.find({_id:id},{friends:1})
res.send(data)
    } catch (error) {
       res.send(error.message) 
    }
})









module.exports={userrouter}