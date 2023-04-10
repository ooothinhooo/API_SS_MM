// import mongoose from "mongoose";
const mongoose = require("mongoose");

const MotelsSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    motelName: { type: String, required: true },
    motelInfo: { type: Array },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
      },
    ],
  },
  { timestamps: true }
);

const Motels = mongoose.model("motels", MotelsSchema);
module.exports = Motels;
    