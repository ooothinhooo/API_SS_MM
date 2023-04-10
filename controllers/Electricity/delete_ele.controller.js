const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const deleteEle = async (req, res) => {
  try {
    const { roomId } = req.query;

    const result = await Room.findOne({
      $and: [{ _id: roomId }, { userId: req.userId }],
    });
    if (!result) {
      return res.json(jsonGenerate(StatusCode.BADREQUEST, "Xoá Thất Bại"));
    }
    const x = await Room.updateOne(
      { _id: roomId },
      { $pop: { electricity: 1 } }
    );
    return res.json(jsonGenerate(StatusCode.ACCEPTED, "Xoa Thanh cong"));
  } catch (error) {}
};

module.exports = deleteEle;
