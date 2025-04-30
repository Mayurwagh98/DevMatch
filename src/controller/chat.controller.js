const Chat = require("../models/Chat");

const chat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { receiverId } = req.params;
    const { message } = req.body;

    let chatExists = await Chat.findOne({
      members: { $all: [userId, receiverId] },
    });

    if (!chatExists) {
      chatExists = new Chat({
        members: [userId, receiverId],
        messages: [],
      });
    }

    chatExists.messages.push({
      sender: userId,
      message,
    });

    await chatExists.save();

    res.status(200).json({ message: "Message sent successfully", chatExists });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { chat };
