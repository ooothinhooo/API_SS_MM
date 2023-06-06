// import mongoose from "mongoose";
const mongoose = require("mongoose");

const postsSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    address: String, //
    phone: String, //
    price: String, //
    province: String, //
    district: String, //
    ward: String, //
    roomFee: Number,
    title: String,
    desc: { type: String, require: true }, //
    isPrivate: { type: Boolean },
    images: { type: Array, default: [] }, //
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

const posts = mongoose.model("posts", postsSchema);
module.exports = posts;
