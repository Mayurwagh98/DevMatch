const ConnectionRequest = require("../models/ConnectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

const requestesReceived = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const receivedRequests = await ConnectionRequest.find({
      receiverUserId: loggedInUser._id,
      status: "interested",
    }).populate("senderUserId", USER_SAFE_DATA);
    return res.status(200).send(receivedRequests);
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};

module.exports = { requestesReceived };
