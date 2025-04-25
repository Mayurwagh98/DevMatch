const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    senderUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    receiverUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "interested", "rejected", "ignored"],
        message: `{VALUE} status is not supported.`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ senderUserId: 1, receiverUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if (connectionRequest.senderUserId.equals(connectionRequest.receiverUserId)) {
    return next(new Error("Cannot send connection request to yourself"));
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
