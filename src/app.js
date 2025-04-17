const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const User = require("./models/User");
const userAuth = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.router");
const profileRouter = require("./routes/profile.router");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);

// ----- delete user by id -----
app.delete("/deleteUser", async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json("user not found");
    return res.status(200).json("user deleted");
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
});

app.post("/sendConnectionReq", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("user:", user);

    res.send("connection request sent by " + user.firstName);
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("connected to database");
    app.listen(8000, () => {
      console.log("server is running on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
