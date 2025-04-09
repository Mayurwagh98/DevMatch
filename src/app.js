const express = require("express");
const auth = require("./middlewares/auth");

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
// app.post("/mayur/:userId", (req, res) => {
//   console.log(req.params);
//   res.send("Hello Mayur");
// });

// ------- middleware example -----
// app.get("/user", auth, (req, res) => {
//   res.send("Hello User");
// });

// -------- next & error handling -------
// app.use(
//   "/",
//   (err, req, res, next) => {
//     console.log("error:", err);
//     // next();
//   },
//   (req, res) => {
//     res.send("Hello next response");
//   }
// );

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
