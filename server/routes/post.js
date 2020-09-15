const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const { request } = require("express");
const Post = mongoose.model("Post");

// Show all posts created by all users
router.get("/allpost", (request, response) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      response.json({ posts });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Show all posts created by user
router.get("/mypost", requireLogin, (request, response) => {
  Post.find({ postedBy: request.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      response.json({ mypost });
    })
    .catch((error) => {
      console.log(error);
    });
});

// Create post
router.post("/createpost", requireLogin, (request, response) => {
  const { title, body, image } = request.body;
  if (!title || !body || !image) {
    return response.status(422).json({
      error: "Please add all the required fields!",
    });
  }
  // Do not include password in response
  request.user.password = undefined;
  const post = new Post({
    title,
    body,
    image,
    postedBy: request.user,
  });
  post
    .save()
    .then((result) => {
      response.json({ post: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
