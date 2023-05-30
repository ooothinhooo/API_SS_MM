const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");
const Member = require("../../models/Member.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Service = require("../../models/Services.model.js");

const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.query;
    const result = await Room.findOneAndDelete({
      _id: roomId,
    });

    if (result) {
      const service = await Service.updateMany(
        { _id: result?.services },
        { $pull: { RoomUse: roomId } }
      );
      // await Member.findOneAndUpdate(
      //   { roomId: roomId },
      //   {
      //     roomId: null,
      //   }
      // );
      await Member.updateMany(
        { roomId: roomId },
        {
          roomId: null,
        }
      );
      return res.json(
        jsonGenerate(StatusCode.OK, "Xoa Phong Thanh cong", result)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not delete", null)
    );
  }
};

module.exports = deleteRoom;
