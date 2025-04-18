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

const getMyConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Find all connection requests where the logged in user is either the sender or receiver
    // and the status is "accepted"
    const myConnections = await ConnectionRequest.find({
      $or: [
        { senderUserId: loggedInUser._id, status: "accepted" }, // User is the sender
        { receiverUserId: loggedInUser._id, status: "accepted" }, // User is the receiver
      ],
    })
      // Populate sender and receiver fields with safe user data (firstName, lastName, etc)
      .populate("senderUserId", USER_SAFE_DATA)
      .populate("receiverUserId", USER_SAFE_DATA);

    // Transform the connections array to only return the connected user's data
    // (not the logged in user's data)
    const data = myConnections.map((row) => {
      // If logged in user is the sender, return receiver's data
      if (row.senderUserId._id.toString() === loggedInUser._id.toString()) {
        return row.receiverUserId;
      }
      // If logged in user is the receiver, return sender's data
      return row.senderUserId;
    });
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};

module.exports = { requestesReceived, getMyConnections };
