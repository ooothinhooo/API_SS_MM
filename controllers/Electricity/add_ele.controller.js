const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const addEle = async (req, res) => {
  try {
    const { newEle, oldEle } = req.body;
    const result = await Room.findById(req.body.roomId);

    if (result) {
      await result.updateOne({ $push: { electricity: { newEle, oldEle } } });
      return res.json(jsonGenerate(StatusCode.SUCCESS, "Them thanh cong"));
    }
    return res.json(jsonGenerate(StatusCode.FORBIDDEN, "Them That Bai"));
  } catch (error) {}
};

module.exports = addEle;
