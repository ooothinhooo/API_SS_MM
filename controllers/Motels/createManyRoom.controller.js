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
    const Motel = await Motels.findOne({ _id: motelId });
    if (Motel) {
      const createQueue = [];

      room.map((item, index) => {
        createQueue.push(
          rooms.create({
            userId: req.userId,
            motelId: motelId,
            roomCode: item?.roomCode,
            roomFee: item?.roomFee,
            deposit: item?.deposit,
            category: item?.category,
            services: Motel.services,
          })
        );
      });

      const x = await Promise.all(createQueue);
      // createQueue = [];
      if (x) {
        const service = await Service.updateMany(
          { _id: { $in: Motel.services } },
          {
            $push: { RoomUse: x },
            //   $set: { services: serviceId },
          }
        );

        return res.json(
          jsonGenerate(StatusCode.OK, `Thêm phòng thành công`, { x })
        );
      }
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


module.exports = createManyRoom;
