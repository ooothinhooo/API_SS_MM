const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Service = require("../../models/Services.model.js");

const updateService = async (req, res) => {
  try {
    const { serviceId, motelId } = req.query;
    const service = await Service.findByIdAndUpdate(
      { _id: serviceId },
      {
        ...req.body,
      }
    );
    return res.json(jsonGenerate(StatusCode.OK, "Cập Nhật Dịch Vụ Thành Công"));
  } catch (error) {}
};

module.exports = updateService;
