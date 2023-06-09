const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
function removeAccents(str) {
  const accents = {
    à: "a",
    ả: "a",
    ã: "a",
    á: "a",
    ạ: "a",
    ă: "a",
    ằ: "a",
    ẳ: "a",
    ẵ: "a",
    ắ: "a",
    ặ: "a",
    â: "a",
    ầ: "a",
    ẩ: "a",
    ẫ: "a",
    ấ: "a",
    ậ: "a",
    đ: "d",
    è: "e",
    ẻ: "e",
    ẽ: "e",
    é: "e",
    ẹ: "e",
    ê: "e",
    ề: "e",
    ể: "e",
    ễ: "e",
    ế: "e",
    ệ: "e",
    ì: "i",
    ỉ: "i",
    ĩ: "i",
    í: "i",
    ị: "i",
    ò: "o",
    ỏ: "o",
    õ: "o",
    ó: "o",
    ọ: "o",
    ô: "o",
    ồ: "o",
    ổ: "o",
    ỗ: "o",
    ố: "o",
    ộ: "o",
    ơ: "o",
    ờ: "o",
    ở: "o",
    ỡ: "o",
    ớ: "o",
    ợ: "o",
    ù: "u",
    ủ: "u",
    ũ: "u",
    ú: "u",
    ụ: "u",
    ư: "u",
    ừ: "u",
    ử: "u",
    ữ: "u",
    ứ: "u",
    ự: "u",
    ỳ: "y",
    ỷ: "y",
    ỹ: "y",
    ý: "y",
    ỵ: "y",
  };
  return str
    .split("")
    .map((c) => accents[c] || c)
    .join("");
}
const searchPost = async (req, res) => {
  try {
    const PAGE_SIZE = 12;
    const skip = 1;
    var needle = req.query.q;
    const searchStr = removeAccents(needle)
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase();
    try {
      const title = new RegExp(needle, "i");

      const result = await Post.find({
        $or: [
          { title },
          { province: title },
          { district: title },
          { ward: title },
          { address: title },
        ],
      })
        .sort({ view: -1 })
        .limit(PAGE_SIZE);
      //?

      return res.json(jsonGenerate(StatusCode.OK, "Data Succssfully", result));
    } catch (error) {
      return res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
      );
    }
  } catch (error) {}
};

module.exports = searchPost;
