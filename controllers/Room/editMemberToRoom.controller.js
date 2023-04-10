const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const editMemberToRoom = async (req, res) => {
  try {
    const { roomId, name, sdt, avatar, email, cccd, note } = req.body;

    const result = await Room.findById({ _id: roomId });
    let hasValue = result.member.some((obj) =>
      Object.values(obj).includes(cccd)
    );

    if (hasValue) {
      const x = await result.updateOne({
        $pull: { member: { cccd } },
      });
      if (x) {
        const room = await Room.findOneAndUpdate(
          { _id: roomId },
          {
            $push: { member: { name, sdt, avatar, email, cccd, note } },
          }
        );
        return res.json(
          jsonGenerate(StatusCode.OK, "sửa Thành Viên Thành Công", room)
        );
      }
    } else {
      return res.json(
        jsonGenerate(
          StatusCode.OK,
          "sửa Thành Viên Không Thành Công",
          result
        )
      );
    }
  } catch (error) {}
};

module.exports = editMemberToRoom;
