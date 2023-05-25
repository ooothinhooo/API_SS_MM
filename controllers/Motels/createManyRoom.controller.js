const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Service = require("../../models/Services.model.js");
const rooms = require("../../models/Room.model.js");

const createManyRoom = async (req, res) => {
  try {
    const { roomCode, motelId, roomFee, deposit, category, service } =
      req.query;
    const { room } = req.body;
    const Motel = await Motels.findOneAndUpdate({ _id: motelId });
    if (Motel) {
      const createQueue = [];

      room.map((item, index) => {
        rooms.create({
          userId: req.userId,
          motelId: motelId,
          roomCode: item?.roomCode,
          roomFee: item?.roomFee,
          deposit: item?.deposit,
          category: item?.category,
          services: Motel.services,
        });
        console.log(`Created room: ${item.roomCode}`);
      });

      // await Promise.all(createQueue);
      // createQueue = [];

      return res.json(jsonGenerate(StatusCode.OK, `Thêm phòngthành công`, {}));
    } else {
      return res.json(
        jsonGenerate(
          StatusCode.MULTISTATUS,
          `Thêm phòng ${room_Code} Thất Bại`,
          result
        )
      );
    }
  } catch (error) {}
};

const PushMotel = async (Queue) => {
  try {
    Queue.map((item) => {
      Motels.findOneAndUpdate(
        { _id: motelId },
        {
          $push: { rooms: item?._id },
        }
      );
    });
  } catch (error) {}
};
module.exports = createManyRoom;
