import mongoose from "mongoose";
let { Schema, models, model } = mongoose;
const AdSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "ad title must be provided"],
      minlength: [3, "ad title length must be more than 6 characters"],
    },
    price: {
      type: Number,
      required: [true, "ad price must be provided"],
    },
    city: { type: String, default: "" },
    details: [{ name: String, value: String }],
    description: {
      type: String,
      minlength: [100, "ad description must be more than 100 characters"],
    },
    catagorie: {
      type: String,
      enum: {
        values: [
          "automobiles",
          "electronics",
          "fashion",
          "others",
          "jobs",
          "real estate",
          "entertainment",
          "lifestyle",
        ],
        message: "{VALUE} is not supported",
      },
    },
    images: [String],
    authorId: {
      type: String,
      required: [true, "this userId is not valid"],
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // rating: { type: Number, default: 4.5 },
    tags: [String],
  },
  {
    _id: true, // Enable auto-generated _id field
    timestamps: true, // Enable createdAt and updatedAt fields
  }
);
// delete models.Ad;

let Ad = models.Ad;
if (!Ad) {
  Ad = model("Ad", AdSchema);
}
export default Ad;
