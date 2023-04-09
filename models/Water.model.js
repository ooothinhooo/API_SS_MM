// import mongoose from "mongoose";
const mongoose = require("mongoose");

const waterSchema = mongoose.Schema({}, { timestamps: true });

const water = mongoose.model("water", waterSchema);
module.exports = water;
