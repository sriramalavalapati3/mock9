/**
 * @swagger
 * components:
 *   schemas:
 *     users:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: "Id will be generated automatically"
 *         name:
 *           type: string
 *           description: "Name of user"
 *         email:
 *           type: string
 *           description: "User email"
 *         address:
 *           type: object
 *           description: "User address"
 *         password:
 *           type: string
 *           description: "User password"
 *       required:
 *         - name
 *         - email
 *         - address
 *         - password
 */



















const express = require("express")

const Userrouter = express.Router();
const { Usermodel } = require("../model/user.model")
const Postrouter = express.Router();
const { Postmodel } = require("../model/postmodel")

// This endpoint should allow the user to send a friend request to another user identified by its ID.
//(Protected Route)

Userrouter.post("/users/:id/friends", async (req, res) => {
    let id = req.params.id;
    console.log(req.body)
    try {
        let data = await Usermodel.findByIdAndUpdate({ _id: id }, { $push: { friendRequests: req.body } })
        res.send("friendrequest successfull")
    } catch (error) {
        res.send(error.message)
    }
})

// This endpoint should allow users to accept or reject friend requests sent to them by another user identified by its ID

Userrouter.post("/users/:id/friends/:friendId/:val", async (req, res) => {
    let id = req.params.id;
    let friendsid = req.params.friendId;
    let value = req.params.val

    try {
        if (value == 1) {
            let data = await Usermodel.findByIdAndUpdate({ _id: id }, { $pull: { friendRequests: { userID: friendsid } } })
            await Usermodel.findByIdAndUpdate({ _id: id }, { $push: { friends: { userID: friendsid } } })
            res.send("friendrequest accepted")
        } else {
            let data = await Usermodel.findByIdAndUpdate({ _id: id }, { $pull: { friendRequests: { userID: friendsid } } })
            res.send("friendrequest declined")
        }

    } catch (error) {
        res.send(error.message)
    }
})

//This endpoint should return a list of all posts.

Postrouter.post("/posts", async (req, res) => {
    try {
        let _id = req.body.userID
        let data = new Postmodel(req.body);
        await data.save();
        await Usermodel.findByIdAndUpdate({ _id }, { $push: { posts: { postid: data._id.toString() } } })

        res.send("posted successfully")
    } catch (error) {
        res.send(error.message)
    }
})

//This endpoint should allow users to update the text or image of a specific post identified by its ID.

Postrouter.patch("/posts/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        let user = req.body.userID
        let { text, image } = req.body

        let data1 = await Postmodel.findOne({ _id });
        console.log(`${data1.userID} ${user}`)
        if (data1.userID == user) {
            await Postmodel.findByIdAndUpdate({ _id }, { text, image });
            res.send("updated successfully")
        } else {
            res.send("your not authorized")
        }


    } catch (error) {
        res.send(error.message)
    }
})

// This endpoint should allow users to delete a specific post identified by its ID.

Postrouter.delete("/posts/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        let user = req.body.userID
        let { text, image } = req.body

        let data1 = await Postmodel.findOne({ _id });

        if (data1.userID == user) {
            await Postmodel.findByIdAndDelete({ _id });
            res.send("deleted successfully")
        } else {
            res.send("your not authorized")
        }


    } catch (error) {
        res.send(error.message)
    }
})

//This endpoint should allow users to like a specific post identified by its ID.

Postrouter.post("/posts/:id/like", async (req, res) => {
    try {
        let _id = req.params.id;
        let user = req.body.userID
        await Postmodel.findByIdAndUpdate({ _id }, { $push: { likes: { userID: user } } });
        res.send("liked successfully")



    } catch (error) {
        res.send(error.message)
    }
})

//This endpoint should allow users to comment on a specific post identified by its ID.

Postrouter.post("/posts/:id/comment", async (req, res) => {
    try {
        let _id = req.params.id;
        let user = req.body.userID
        let { text } = req.body;
        await Postmodel.findByIdAndUpdate({ _id }, { $push: { comments: { userID: user, text } } });
        res.send("commented successfully")



    } catch (error) {
        res.send(error.message)
    }
})

module.exports = { Userrouter, Postrouter }


