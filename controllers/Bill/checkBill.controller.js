const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

function updateObjsByMonth(arr, months, status) {
  // Create a new array to store the updated objects
  let newArr = [...arr];
  let statusFalse = { status: false };
  // Loop through the months array
  for (let i = 0; i < newArr.length; i++) {
    let updatedObj = { ...newArr[i], ...statusFalse };
    newArr[i] = updatedObj;
  }
  for (let month of months) {
    // Find the index of the object to update
    let index = newArr.findIndex((obj) => obj.month === month);
    // If the object is found, update it
    if (index !== -1) {
      let updatedObj = { ...newArr[index], ...status };
      newArr[index] = updatedObj;
    }
  }
  // Return the new array with updated objects
  return newArr;
}

const checkBill = async (req, res) => {
  try {
    // const { newWater, oldWater, roomId } = req.query;
    // const result = await Room.findById(roomId);
    const { roomId } = req.query;
    const { ArrayChecked, ArrayNoChecked } = req.body;
    let statusTrue = { status: true };
    let statusFalse = { status: false };
    const result = await Room.findOne({
      $and: [{ _id: roomId }, { userId: req.userId }],
    });
    if (result) {
      let bill = updateObjsByMonth(
        result.bill,
        ArrayChecked,
        statusTrue,
        statusFalse
      );
      const x = await result.updateOne({
        $set: {
          bill,
        },
      });

      // if (x) {
      //   let bill = updateObjsByMonth(result.bill, ArrayNoChecked, statusFalse);
      //   await result.updateOne({
      //     $set: {
      //       bill,
      //     },
      //   });
      // }
      return res.json(jsonGenerate(StatusCode.OK, "Cập Nhật Thành Công"));
    }
    return res.json(jsonGenerate(StatusCode.BADREQUEST, "Cập Nhật Thất Bại"));
  } catch (error) {}
};

module.exports = checkBill;
