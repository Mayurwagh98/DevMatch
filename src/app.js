const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.use("/about", (req, res) => {
  res.send("About Page");
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
