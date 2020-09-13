const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_secret } = require("../keys");

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

router.post("/signin", (request, response) => {
  const { password, email } = request.body;
  if (!password || !email) {
    return response.status(422).json({
      error: "Please provide both email and password",
    });
  }
  User.findOne({
    email: email,
  })
    .then((savedUser) => {
      if (!savedUser) {
        return response.status(422).json({ error: "Invalid credentials" });
      }
      bcrypt.compare(password, savedUser.password).then((passwordMatch) => {
        if (passwordMatch) {
          // response.json({ message: "Successful login" });
          // create JWT token for user
          const token = jwt.sign({ _id: savedUser._id }, JWT_secret);
          response.json({ token });
        } else {
          return response.status(422).json({ error: "Invalid credentials" });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
