// import mongoose from "mongoose";
const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    avatar: { type: String },
    cccd: { type: String, required: true },
    dateRange: { type: String, required: true },
    sex: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
    },
    carNum: { type: String },
    dateSub: { type: String },
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
