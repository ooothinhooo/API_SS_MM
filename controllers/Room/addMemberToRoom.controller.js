const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");

const addMemberToRoom = async (req, res) => {
  try {
    const { roomId, memberId } = req.query;
    // const member = ({ name, sdt, avatar, email, cccd, note } = req.body);

    const result = await Room.findOne({
      $and: [{ _id: roomId }, { userId: req.userId }],
    });
    const member = await Member.findById({ _id: memberId });
    if (result && member) {
      const room = await Room.findOneAndUpdate(
        { _id: roomId },
        {
          $push: { member: memberId },
        }
      );
      await Member.findOneAndUpdate(
        { _id: memberId },
        {
          $push: { roomId },
        }
      );
      return res.json(
        jsonGenerate(StatusCode.OK, "Thêm Thành Viên Thành Công", room)
      );
    } else {
      return res.json(
        jsonGenerate(
          StatusCode.BADREQUEST,
          "Thêm Thành Viên Không Thành Công",
          null
        )
      );
    }
  } catch (error) {}
};

module.exports = addMemberToRoom;
