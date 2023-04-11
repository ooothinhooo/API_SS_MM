const express = require("express");
const app = express();
const cors = require("cors");
const AuthMiddleware = require("../middlewares/AuthMidleware.js");

// import AuthRouter from "./AuthRouter.js";
const AuthRouter = require("./Auth.router.js");
const MotelRouter = require("./Motel.router.js");
const RoomRouter = require("./Room.router.js");
const PostRouter = require("./Post.router.js");
const ApiRouter = require("./Api.router.js");
const UserRouter = require("./User.router.js");
const MemberRouter = require("./Member.router.js");
// Middleware
app.use(cors());
app.use(express.json());
const router = express.Router();

app.use("/auth", AuthRouter);
app.use("/motel", AuthMiddleware, MotelRouter);
app.use("/room", AuthMiddleware, RoomRouter);
app.use("/posts", AuthMiddleware, PostRouter);
app.use("/user", AuthMiddleware, UserRouter);
app.use("/member", AuthMiddleware, MemberRouter);
app.use("/", ApiRouter);
module.exports = app;
