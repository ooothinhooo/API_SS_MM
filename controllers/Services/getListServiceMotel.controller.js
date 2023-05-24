const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const getListServiceMotel = async (req, res) => {
  try {
    const result = await Motels.findById({
      _id: req.query.motelId,
    }).populate({
      path: "services",
      populate: {
        path: "RoomUse",
        select: "roomCode",
      },
    });

    return res.json(jsonGenerate(StatusCode.OK, result?.motelName, result));
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};

module.exports = getListServiceMotel;
