const express = require("express");
const app = express();
const port = 3000;

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
