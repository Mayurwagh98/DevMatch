const userProfile = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).send(user);
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
};

module.exports = { userProfile };
