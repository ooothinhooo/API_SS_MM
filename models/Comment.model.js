const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentModel = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    postId: mongoose.Types.ObjectId,
    content: { type: String, required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const comment = mongoose.model("comment", CommentModel);
module.exports = comment;
