const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const User = require("./models/User");

const app = express();

app.post("/user", async (req, res) => {
  const newUser = new User({
    firstName: "mayur",
    lastName: "kumar",
    email: "",
    lastName: "kumar",
    email: "EMAIL",
    password: "123456",
    age: 22,
  });

  try {
    await newUser.save();
    return res.status(200).json("user created");
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: "Internal server error" });
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
