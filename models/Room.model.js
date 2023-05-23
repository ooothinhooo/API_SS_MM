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
    category: {
      type: String,
      required: true,
    },
    bill: {
      type: Array,
      default: [],
    },
    userSub: { type: mongoose.Schema.Types.ObjectId, ref: "member" },
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: "member" }],
    //ngày nhận phòng
    checkIn: {
      type: String,
    },

    // giá phòng
    roomFee: {
      type: String,
    },
    // tiền cọc
    deposit: {
      type: String,
    },
    electricityPrice: {
      type: String,
    },
    waterPrice: {
      type: String,
    },
    //kỳ hạn
    term: {
      type: String,
    },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "services" }],
  },
  { timestamps: true }
);

const rooms = mongoose.model("rooms", roomsSchema);
module.exports = rooms;
