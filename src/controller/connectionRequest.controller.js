const ConnectionRequest = require("../models/ConnectionRequest");

const connectionRequest = async (req, res) => {
  try {
    const senderUserId = req.user._id;
    const receiverUserId = req.params.receiverUserId;
    const status = req.params.status;

    const newConnectionRequest = new ConnectionRequest({
      senderUserId,
      receiverUserId,
      status,
    });

    await newConnectionRequest.save();
    return res.status(201).json({
      message: `${req.user.firstName} sent request to`,
      newConnectionRequest,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { connectionRequest };
