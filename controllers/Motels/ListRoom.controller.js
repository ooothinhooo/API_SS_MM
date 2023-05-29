const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const listRoom = async (req, res) => {
  try {
    // var uid = req.query.uid;
    // const result = await Motels.findOne({ userId: req.userId })
    // const result = await Motels.findById(req.query.motelId)
    //   .populate("rooms")
    //   .populate("services")
    //   .exec();
    const result = await Room.find({ motelId: req.query.motelId })
      .populate("member")
      .populate("motelId")
      .populate("userSub")
      .populate("services");

    return res.json(jsonGenerate(StatusCode.OK, result?.motelName, result));
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};

module.exports = listRoom;
