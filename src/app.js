const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const User = require("./models/User");
const bcrypt = require("bcrypt");
const userAuth = require("./middlewares/auth");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());

app.use(cookieParser());

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
app.patch("/updateUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body;

    const ALLOWED_UPDATES = [
      "firstName",
      "photoUlr",
      "lastName",
      "age",
      "skills",
    ];

    const isValidUpdate = Object.keys(updates).every((update) =>
      ALLOWED_UPDATES.includes(update)
    );

    if (!isValidUpdate) return res.status(400).send("Invalid update");

    if (updates.skills.length > 5)
      return res.status(400).send("max 5 skills allowed");

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json("user not found");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("something went wrong:" + error.message);
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

// ----- signup ----------
app.post("/signup", async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) return res.status(400).send("user already exists");

  try {
    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ ...req.body, password: hasedPassword });

    await newUser.save();

    res.status(201).send("user created");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("user not found");
  try {
    const isPasswordValid = await user.validatePassword(password); // method defined in User.j

    if (!isPasswordValid) {
      return res.status(400).send("invalid credentials");
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.status(200).send("login successful");
  } catch (error) {
    res.status(500).send(error.message);
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
