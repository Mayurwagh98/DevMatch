const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/User");

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

const getMyFeed = async (req, res) => {
  try {
    const loggedInUser = req.user;
    let limit = parseInt(req.query.limit) || 10;
    // adding limit to 20 to avoid unnecessary queries to the database, so user
    // can't manipulate the limit to a large number
    limit = limit > 20 ? 20 : limit;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    // ------> conditions to check <-------
    // 1. logged in user should not see his/her own card
    // 2. logged in user should not see cards who are already connected
    // 3. logged in user should not see cards who have sent him/her a connection request

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { senderUserId: loggedInUser._id },
        { receiverUserId: loggedInUser._id },
      ],
    });

    const hideUsersFromFeed = new Set();

    connectionRequest.forEach((row) => {
      hideUsersFromFeed.add(row.senderUserId.toString());
      hideUsersFromFeed.add(row.receiverUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { requestesReceived, getMyConnections, getMyFeed };
