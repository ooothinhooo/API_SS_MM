// import mongoose from "mongoose";
const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    motelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "motels",
      required: true,
    },
    roomCode: {
      type: String,
      required: true,
    },
    checkIn: {
      type: String,
    },
    checkOut: {
      type: String,
    },
    roomFee: {
      type: String,
    },
    deposit: {
      type: String,
    },
    water: { type: Array, default: [] },
    electricity: { type: Array, default: [] },
    member: { type: mongoose.Schema.Types.ObjectId, ref: "member" },
  },
  { timestamps: true }
);

const rooms = mongoose.model("rooms", roomsSchema);
module.exports = rooms;
