const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const featuredPost = async (req, res) => {
  const PAGE_SIZE = 20;
  const { province, district, ward, feeStart, feeEnd } = req.query;
  try {
    var page = req.query.page;
    if (page) {
      page = parseInt(page);
      if (page < 1) page = 1;
      var skip = (page - 1) * PAGE_SIZE;
      const query = {};
      if (province) query.province = province;
      if (district) query.district = district;
      if (ward) query.ward = ward;
      if (feeStart && feeEnd) query.roomFee = { $gte: feeStart, $lte: feeEnd };

      Post.find(query);

      Post.find(query)
        .populate("userId likes", "username avatar first_name last_name")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "username avatar first_name last_name",
          },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PAGE_SIZE)
        .then((data) => {
          res.json(data);
        });
    } else {
      return res.json(
        jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Lỗi Truy Vấn", error)
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};

module.exports = featuredPost;
