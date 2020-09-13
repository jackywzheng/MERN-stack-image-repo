const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

router.get("/", (request, response) => {
  response.send("Hello");
});

router.post("/signup", (request, response) => {
  const { name, password, email } = request.body;
  if (!name || !password || !email) {
    return response
      .status(422)
      .json({ error: "Please add all the fields required" });
  }
  // Check database if the email is already used
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return response
          .status(422)
          .json({ error: "User already exists with that email" });
      }
      // Hash password before saving to DB
      bcrypt.hash(password, 10).then((hashedPassword) => {
        const user = new User({
          name,
          password: hashedPassword,
          email,
        });
        user
          .save()
          .then((user) => {
            response.json({ message: "User saved successfully!" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
