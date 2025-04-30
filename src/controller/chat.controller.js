const Chat = require("../models/Chat");

const chat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { receiverId } = req.params;

    let chatExists = await Chat.findOne({
      members: { $all: [userId, receiverId] },
    }).populate("messages.sender", "firstName lastName");

    if (!chatExists) {
      chatExists = new Chat({
        members: [userId, receiverId],
        messages: [],
      });
    }

    await chatExists.save();

    res.status(200).json(chatExists);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { chat };
