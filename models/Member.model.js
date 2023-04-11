// import mongoose from "mongoose";
const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    avatar: { type: String },
    CCCD: { type: Array, default: [] },
    Phone: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
    },
    carNum: { type: String },
    motelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "motels",
      required: true,
    },
  },
  { timestamps: true }
);

const member = mongoose.model("member", memberSchema);
module.exports = member;
