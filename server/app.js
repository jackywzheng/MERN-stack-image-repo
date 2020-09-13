const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const { mongoURI } = require("./keys");

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB!");
});
mongoose.connection.on("error", (error) => {
  console.log("Error connecting!", error);
});

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

const middleware = (request, response, next) => {
  console.log("Middleware executed!");
  next();
};

app.use(middleware);

app.get("/", (request, response) => {
  console.log("Home page");
  response.send("Hello world!");
});

app.get("/about", (request, response) => {
  console.log("About page");
  response.send("About page!");
});

app.listen(port, () => {
  console.log("Server is running on", port);
});
