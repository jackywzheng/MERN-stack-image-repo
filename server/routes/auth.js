const express = require("express");
const router = express.Router();

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
  response.json({ message: "Successfully posted!" });
});

module.exports = router;
