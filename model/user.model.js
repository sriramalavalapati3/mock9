const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "dob": Date,
    "bio": String,
    "posts": [{
        "postid":String
    }],
    "friends": [{
        "userID":String
     }],
    "friendRequests": [{"userID":String}]
})

const Usermodel=mongoose.model("userdetails",userSchema)

module.exports={Usermodel}