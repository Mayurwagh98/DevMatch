const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const User = require("./models/User");

const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
  const userDetails = req.body;
  const newUser = new User(userDetails);

  try {
    await newUser.save();
    return res.status(200).json("user created");
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/userByEmail", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json("user not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("Something went wrong");
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
