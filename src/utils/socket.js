const socket = require("socket.io");
const crypto = require("crypto");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // create chat room
    socket.on("joinChat", ({ firstName, userId, receiverId }) => {
      const roomId = getSecretRoomId(userId, receiverId);
      console.log(firstName + "joined room" + roomId);
      socket.join(roomId);
    });

    // send message to room
    socket.on("sendMessage", ({ firstName, userId, receiverId, message }) => {
      const roomId = getSecretRoomId(userId, receiverId);
      console.log(firstName + "sent message" + message);

      // send message to room
      io.to(roomId).emit("messageReceived", { firstName, message });
    });
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
