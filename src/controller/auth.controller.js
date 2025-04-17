const User = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
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
};

module.exports = { signup, login };
