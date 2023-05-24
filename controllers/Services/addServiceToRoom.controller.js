const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Service = require("../../models/Services.model.js");

const addServiceToRoom = async (req, res) => {
  try {
    const { motelId, serviceId, roomId } = req.query;
    const { RoomArray } = req.body;
    const user = await User.findById(req.userId);
    console.log(RoomArray);
    console.log(serviceId);

    if (user) {
      const result = await Room.updateMany(
        { _id: { $in: RoomArray } },
        {
          $push: { services: serviceId },
          //   $set: { services: serviceId },
        }
      );
      const service = await Service.findByIdAndUpdate(
        { _id: serviceId },
        {
          $set: { RoomUse: RoomArray },
        }
      );
      return res.json(
        jsonGenerate(StatusCode.OK, `Thêm dịch vụ vào phòng thành công`, result)
      );
    }
    return res.json(jsonGenerate(StatusCode.FORBIDDEN, `Lỗi quyền`));
  } catch (error) {}
};

module.exports = addServiceToRoom;
