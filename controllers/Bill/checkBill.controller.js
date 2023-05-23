const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

// Tìm và cập nhật object theo id
function updateObjById(arr, month, newValues) {
  // Tìm index của object cần cập nhật
  let index = arr.findIndex((obj) => obj.month === month);
  // Nếu không tìm thấy object, trả về mảng ban đầu
  if (index === -1) {
    return arr;
  }
  // Cập nhật object và trả về mảng mới
  let updatedObj = { ...arr[index], ...newValues };
  return [...arr.slice(0, index), updatedObj, ...arr.slice(index + 1)];
}

const checkBill = async (req, res) => {
  try {
    // const { newWater, oldWater, roomId } = req.query;
    // const result = await Room.findById(roomId);
    const { roomId } = req.query;
    const { oldWater, newWater, oldEle, newEle, month, status } = req.body;
    const result = await Room.findOne({
      $and: [{ _id: roomId }, { userId: req.userId }],
    });
    if (result) {
      let bill = updateObjById(result.bill, month, {
        month,
        oldWater,
        newWater,
        oldEle,
        newEle,
        status,
      });
      await result.updateOne({
        $set: {
          bill,
        },
      });
      return res.json(jsonGenerate(StatusCode.OK, "Them thanh cong"));
    }
    return res.json(jsonGenerate(StatusCode.BADREQUEST, "Them That Bai"));
  } catch (error) {}
};

module.exports = checkBill;
