// import mongoose from "mongoose";
const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    content: String,
    images: { type: Array, default: [] },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

const posts = mongoose.model("posts", postsSchema);
module.exports = posts;
