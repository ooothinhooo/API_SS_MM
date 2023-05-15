const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");
const Member = require("../../models/Member.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.query;
    const result = await Room.findOneAndDelete({
      _id: roomId,
    });

    if (result) {
      const model = await Motels.findOneAndUpdate(
        { userId: req.userId },
        { $pull: { rooms: roomId } }
      );
      await Member.findOneAndUpdate(
        { roomId: roomId },
        {
          roomId: null,
        }
      );
      return res.json(
        jsonGenerate(StatusCode.OK, "Xoa Phong Thanh cong", null)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not delete", null)
    );
  }
};

module.exports = deleteRoom;
