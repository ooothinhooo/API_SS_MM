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
    services: { type: mongoose.Types.ObjectId, ref: "services" },
    // service: [
    //   {
    //     ele: {
    //       title: "Tiền Điện",
    //       value: "2000",
    //       unit: "KWH",
    //     },
    //     water: {
    //       title: "Tiền Nước",
    //       value: "10000",
    //       unit: "Khối",
    //     },
    //     wifi: {
    //       title: "Tiền Wifi",
    //       value: "0",
    //       unit: "Người",
    //     },
    //     garbage: {
    //       title: "Tiền Rác",
    //       value: "0",
    //       unit: "Phòng",
    //     },
    //     garbage: {
    //       title: "Tiền Rác",
    //       value: "0",
    //       unit: "Phòng",
    //     },
    //     orther: {
    //       title: "",
    //       value: "",
    //       unit: "",
    //     },
    //   },
    // ],

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
    