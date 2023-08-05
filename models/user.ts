import mongoose from "mongoose";
let { models, model, Schema } = mongoose;
let UserSchema = new Schema(
  {
    name: { type: String, default: "no name" },
    password: String,
    email: {
      type: String,
      unique: [true, "This email is aleardy exist with another account"],
    },
    avatar: { type: String, default: "/user.png" },
    username: { type: String, unique: [true, "username should be unique"] },
    location: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    saved: { type: [String], default: [] },
  },
  {
    _id: true, // Enable auto-generated _id field
    timestamps: true, // Enable createdAt and updatedAt fields
  }
);
// delete models.User;

let User = models.User;
if (!User) {
  User = model("User", UserSchema);
}
export default User;
