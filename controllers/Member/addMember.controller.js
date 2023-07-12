const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");
const rooms = require("../../models/Room.model.js");

const addMember = async (req, res) => {
  try {
    const newPost = await Member.create({
      ...req.body,
    });
    if (newPost) {
      if (req?.body?.roomId) {
        // const room = await rooms.findById({ _id: req?.body.roomId });
        const result1 = await rooms?.findByIdAndUpdate(
          { _id: req?.body.roomId },
          {
            $push: { member: newPost },
          }
        );
        return res.json(
          jsonGenerate(StatusCode.OK, "Cập Nhật Thành Viên Thành Công", result1)
        );
      }
    }
    return res.json(jsonGenerate(StatusCode.OK, "Thêm Thành Viên Thành Công",newPost));
   
  } catch (error) {
    console.log(error)
    return res.json(jsonGenerate(StatusCode.SERVER_ERROR, error));
  }
};

module.exports = addMember;
