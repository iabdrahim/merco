import mongoose from "mongoose";
let { Schema, models, model } = mongoose;
const MessageSchema = new Schema(
  {
    messages: [
      {
        userId: String,
        content: String,
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    sellerId: String,
    buyerId: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    _id: true, // Enable auto-generated _id field
    timestamps: true, // Enable createdAt and updatedAt fields
  }
);
// delete models.Message;

let Message = models.Message;
if (!Message) {
  Message = model("Message", MessageSchema);
}
export default Message;
