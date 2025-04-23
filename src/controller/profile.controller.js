const { validateEditProfileData } = require("../utils/validations");
const User = require("../models/User");

const userProfile = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).send(user);
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
};

const updateProfile = async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const updates = req.body;

    const loggedInUser = req.user;

    Object.keys(updates).forEach((key) => (loggedInUser[key] = updates[key]));

    await loggedInUser.save();

    res
      .status(200)
      .json({
        success: true,
        loggedInUser,
        message: "Profile Updated Succesfully!",
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const user = req.user;

    await User.findByIdAndDelete(user._id);

    res.status(200).json("user deleted");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { userProfile, updateProfile, deleteProfile };
