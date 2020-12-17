const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const { request } = require("express");
const Post = mongoose.model("Post");
const User = mongoose.model("User")

router.get("/user/:id", requireLogin, (request, response) => {
    User.findOne({_id:request.params.id})
    .select("-password")
    .then(user => {
        Post.find({postedBy:request.params.id})
        .populate("postedBy", "_id name")
        .exec((error, posts) => {
            if (error) {
                return response.status(422).json(({error:error}))
            }
            response.json({user, posts})
        })
    }).catch(error => {
        return response.status(404).json(({error: "User not found"}))
    })
})

module.exports = router;
