const mongoose=require("mongoose");
const postSchema=mongoose.Schema({
    "userID":String,
  "text": String,
  "image": String,
  "createdAt":{ type: Date,
    default: Date.now },
  "likes": [{"userID":String}],
  "comments": [{
    "userID":String,
    text: String,
    "createdAt":{ type: Date,
        default: Date.now },
  }]
})

const Postmodel=mongoose.model("postdetails",postSchema)

module.exports={Postmodel}