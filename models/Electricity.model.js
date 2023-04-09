// import mongoose from "mongoose";
const mongoose = require("mongoose");

const electricitySchema = mongoose.Schema({}, { timestamps: true });

const electricity = mongoose.model("electricity", electricitySchema);
module.exports = electricity;
