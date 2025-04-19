const sendConnectionReq = async (req, res) => {
  try {
    const user = req.user;
    console.log("user:", user);

    res.send("connection request sent by " + user.firstName);
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};

module.exports = { sendConnectionReq };
