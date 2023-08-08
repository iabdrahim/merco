import mongoose from "mongoose";
let { Schema, models, model } = mongoose;
const ChatSchema = new Schema(
  {
    messages: [
      {
        userId: String,
        content: String,
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    _id: true, // Enable auto-generated _id field
    timestamps: true, // Enable createdAt and updatedAt fields
  }
);
delete models.Message;

let Chat = models.Chat;
if (!Chat) {
  Chat = model("Chat", ChatSchema);
}
export default Chat;
