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

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
