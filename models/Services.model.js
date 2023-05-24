// import mongoose from "mongoose";
const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    motelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "motels",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    RoomUse: [{ type: mongoose.Schema.Types.ObjectId, ref: "rooms" }],
  },
  { timestamps: true }
);

const Service = mongoose.model("services", serviceSchema);
module.exports = Service;
