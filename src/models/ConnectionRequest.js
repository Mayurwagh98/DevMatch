const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionRequestSchema = new Schema(
  {
    senderUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    receiverUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "interested", "rejected"],
        message: `{VALUE} status is not supported.`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if (connectionRequest.senderUserId.equals(connectionRequest.receiverUserId)) {
    return next(new Error("Cannot send connection request to yourself"));
  }
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
