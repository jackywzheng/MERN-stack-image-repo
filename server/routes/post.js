const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.post("/createpost", requireLogin, (request, response) => {
  const { title, body } = request.body;
  if (!title || !body) {
    return response.statusCode(422).json({
      error: "Please add all the required fields!",
    });
  }
  // Do not include password in response
  request.user.password = undefined;
  const post = new Post({
    title,
    body,
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
