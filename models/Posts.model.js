// import mongoose from "mongoose";
const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    addresses: String,
    phone: String,
    price: String,
    city: String,
    district: String,
    ward: String,
    road: String,
    content: { type: String, require: true },
    isPrivate: { type: Boolean },
    images: { type: Array, default: [] },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

const posts = mongoose.model("posts", postsSchema);
module.exports = posts;
