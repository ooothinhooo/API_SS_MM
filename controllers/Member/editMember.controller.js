const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");
const Room = require("../../models/Room.model.js");

const editMember = async (req, res) => {
  const {
    fullName,
    dob,
    cccd,
    dateRange,
    sex,
    phone,
    address,
    carNum,
    idPhoto1,
    idPhoto2,
    roomId,
  } = req.body;
  try {
    const result = await Member.findByIdAndUpdate(
      { _id: req.query.memberId },
      {
        fullName,
        dob,
        cccd,
        dateRange,
        sex,
        phone,
        address,
        carNum,
        idPhoto1,
        idPhoto2,
        roomId,
      }
    );
    if (req?.body.roomId) {
      const room = await Room.findById({ _id: req?.body.roomId });
      if (!room?.member.includes(req.query.memberId)) {
        const result1 = await Room?.findByIdAndUpdate(
          { _id: req?.body.roomId },
          {
            $push: { member: result },
          }
        );
        return res.json(
          jsonGenerate(StatusCode.OK, "Cập Nhật Thành Viên Thành Công", result1)
        );
      }
    }

    return res.json(
      jsonGenerate(StatusCode.OK, "Cập Nhật Thành Viên Thành Công", result)
    );
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

module.exports = editMember;
