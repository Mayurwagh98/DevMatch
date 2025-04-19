const ConnectionRequest = require("../models/ConnectionRequest");
const User = require("../models/User");

const connectionRequest = async (req, res) => {
  try {
    const senderUserId = req.user._id;
    const receiverUserId = req.params.receiverUserId;
    const status = req.params.status;

    const ALLOWED_STATUSES = ["interested", "rejected"];

    const isStatusValid = ALLOWED_STATUSES.includes(status);

    if (!isStatusValid) {
      throw new Error("Invalid status selected");
    }

    const receiverUser = await User.findById(receiverUserId);
    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver user not found" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { senderUserId, receiverUserId },
        { senderUserId: receiverUserId, receiverUserId: senderUserId },
      ],
    });

    if (existingRequest) {
      throw new Error("Request already sent");
    }

    const newConnectionRequest = new ConnectionRequest({
      senderUserId,
      receiverUserId,
      status,
    });

    await newConnectionRequest.save();
    return res.status(201).json({
      message: `${req.user.firstName} sent request to ${receiverUser.firstName}`,
      newConnectionRequest,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const requestReview = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { requestId, status } = req.params;

    const ALLOWED_STATUSES = ["accepted", "rejected"];

    const isStatusValid = ALLOWED_STATUSES.includes(status);
    if (!isStatusValid) {
      throw new Error("Invalid status selected");
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      receiverUserId: loggedInUser._id,
      status: "interested",
    }).populate("senderUserId", "firstName lastName profilePhoto");

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;
    const accpetedRequest = await connectionRequest.save();

    return res
      .status(200)
      .json({
        message: `Connection request ${status} by ${loggedInUser.firstName} ${loggedInUser.lastName}`,
        accpetedRequest,
      });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { connectionRequest, requestReview };
