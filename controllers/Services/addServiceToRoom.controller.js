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
    const { Push, Pull } = req.body;
    // const user = await User.findById(req.userId);
    console.log(Push);
    console.log(serviceId);
    // const service = await Service.findById({_id:serviceId})
    if (true) {
      // const result = await Room.updateMany(
      //   { _id: { $in: Push } },
      //   {
      //     $push: { services: serviceId },
      //   }
      // );
      const result = await Room.updateMany(
        { _id: { $in: Push }, services: { $ne: serviceId } },
        {
          $addToSet: { services: serviceId },
        }
      );
      const result2 = await Room.updateMany(
        { _id: { $in: Pull } },
        {
          $pull: { services: serviceId },
        }
      );
      const service = await Service.findByIdAndUpdate(
        { _id: serviceId },
        {
          $set: { RoomUse: Push },
        }
      );
      return res.json(
        jsonGenerate(
          StatusCode.OK,
          `Thêm dịch vụ vào phòng thành công`,
          service
        )
      );
    }
    return res.json(jsonGenerate(StatusCode.FORBIDDEN, `Lỗi quyền`));
  } catch (error) {}
};

module.exports = addServiceToRoom;
