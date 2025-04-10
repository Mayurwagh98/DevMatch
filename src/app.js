const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const User = require("./models/User");

const app = express();

app.use(express.json());

// ----- get single user -----
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

// ----- get all users -----
app.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// ----- get single user by email -----
app.get("/userByEmail", async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json("user not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
});

// ----- get single user by id -----
app.get("/userById", async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json("user not found");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
});

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

// ----- update user by id -----
app.patch("/updateUser", async (req, res) => {
  try {
    const userId = req.body.userId;
    const updates = req.body;
    console.log("updates:", updates);
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!user) return res.status(404).json("user not found");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
});

// ----- update user by email -----
app.patch("/updateUserByEmail", async (req, res) => {
  try {
    const email = req.body.email;
    const updates = req.body;
    const user = await User.findOneAndUpdate({ email }, updates, { new: true });
    if (!user) return res.status(404).json("user not found");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("something went wrong");
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
