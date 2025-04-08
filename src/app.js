const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/mayur", (req, res) => {
//   res.send("Hello Mayur");
// });

// ------- query ------
// app.post("/mayur", (req, res) => {
//   console.log(req.query);
//   res.send("Hello Mayur");
// });

// ------- params ------
app.post("/mayur/:userId", (req, res) => {
  console.log(req.params);
  res.send("Hello Mayur");
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
