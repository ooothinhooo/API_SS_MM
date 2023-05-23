const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const addRoom = async (req, res) => {
  try {
    const { roomCode, motelId, roomFee, deposit, category, service } =
      req.query;

    // const user = await User.findById(req.userId)
    const result = await Room.create({
      userId: req.userId,
      motelId: motelId,
      roomCode: roomCode,
      roomFee,
      deposit,
      category,
    });
    return res.json(
      jsonGenerate(StatusCode.OK, `Thêm phòng ${roomCode} thành công`, result)
    );
    // if (result) {
    //   const Motel = await Motels.findOneAndUpdate(
    //     { _id: motelId },
    //     {
    //       $push: { rooms: result },
    //     }
    //   );

    // } else {
    //   return res.json(
    //     jsonGenerate(
    //       StatusCode.MULTISTATUS,
    //       `Thêm phòng ${room_Code} Thất Bại`,
    //       result
    //     )
    //   );
    // }
  } catch (error) {}
};

module.exports = addRoom;
