const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");

const findRoom = async (req, res) => {
  try {
    const { roomId, month } = req.query;
    const room = await Room.findOne({ _id: roomId });
    var result = room?.bill?.find((obj) => obj.month === month);
    console.log(result);
    // const x = room.select("-bill");
    return res.json(jsonGenerate(StatusCode.OK, "Data", { room, result }));
  } catch (error) {}
};

module.exports = findRoom;
