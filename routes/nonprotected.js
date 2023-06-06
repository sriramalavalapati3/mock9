const express=require("express")

const postrouter=express.Router();
const {Postmodel}=require("../model/postmodel")


// This endpoint should return a list of all posts.

postrouter.get("/posts",async(req,res)=>{
    try {
       let data=await Postmodel.find({});
       res.send(data) 
    } catch (error) {
        res.send(error.message)
    }
})

// This endpoint should return the details of a specific post identified by its ID.


postrouter.get("/posts/:id",async(req,res)=>{
    try {
        let _id=req.params.id
       let data=await Postmodel.find({_id});
       res.send(data) 
    } catch (error) {
        res.send(error.message)
    }
})

module.exports={postrouter}

