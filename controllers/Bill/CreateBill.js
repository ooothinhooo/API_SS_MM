const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const CreateBill = async (req, res) => {
  try {
    // const { newWater, oldWater, roomId } = req.query;
    // const result = await Room.findById(roomId);
    const { roomId } = req.query;
   
    const result = await Room.findOne({
      $and: [{ _id: roomId }, { userId: req.userId }],
    });
    if (result) {
      await result.updateOne({
        $push: {
          bill: {
            ...req.body,
          },
        },
      });
      return res.json(jsonGenerate(StatusCode.OK, "Them thanh cong"));
    }
    return res.json(jsonGenerate(StatusCode.BADREQUEST, "Them That Bai"));
  } catch (error) {}
};

module.exports = CreateBill;
