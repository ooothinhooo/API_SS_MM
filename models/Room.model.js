// import mongoose from "mongoose";
const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema(
  {
    room_Code: {
      type: String,
      required: true,
    },
    water: { type: Array, default: [] },
    electricity: { type: Array, default: [] },
    member: { type: Array, default: [] },
  },
  { timestamps: true }
);

const rooms = mongoose.model("rooms", roomsSchema);
module.exports = rooms;
