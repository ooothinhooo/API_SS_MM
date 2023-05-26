const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Service = require("../../models/Services.model.js");

const deleteService = async (req, res) => {
  try {
    const { motelId, serviceId } = req.query;

    // const user = await User.findById(req.userId)
    const result = await Service.findOneAndDelete({ _id: serviceId });
    const motel = await Motels.findByIdAndUpdate(
      { _id: motelId },
      {
        $pull: { services: serviceId },
      }
    );
    const roomUse = await Room.updateMany(
      {
        _id: result.RoomUse,
      },
      {
        $pull: { services: serviceId },
      }
    );
    return res.json(
      jsonGenerate(StatusCode.OK, `Xoá dịch vụ  thành công`, result)
    );
  } catch (error) {}
};

module.exports = deleteService;
