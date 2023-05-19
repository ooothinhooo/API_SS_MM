const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

// Tìm và cập nhật object theo id
function updateObjById(arr, id, newValues) {
  // Tìm index của object cần cập nhật
  let index = arr.findIndex((obj) => obj.id === id);
  // Nếu không tìm thấy object, trả về mảng ban đầu
  if (index === -1) {
    return arr;
  }
  // Cập nhật object và trả về mảng mới
  let updatedObj = { ...arr[index], ...newValues };
  return [...arr.slice(0, index), updatedObj, ...arr.slice(index + 1)];
}

const DeleteBill = async (req, res) => {
  try {
    // const { newWater, oldWater, roomId } = req.query;
    // const result = await Room.findById(roomId);
    const { roomId, month } = req.query;
    // const { month } = req.body;
    const result = await Room.findOne({
      $and: [{ _id: roomId }, { userId: req.userId }],
    });
    if (result) {
      bill = result?.bill.filter((obj) => obj.month !== month);
      await result.updateOne({
        $set: {
          bill,
        },
      });
      return res.json(jsonGenerate(StatusCode.OK, "Xoá Bill Thành công"));
    }
    return res.json(jsonGenerate(StatusCode.BADREQUEST, "Them That Bai"));
  } catch (error) {}
};

module.exports = DeleteBill;
