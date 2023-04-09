const express = require("express");
const app = express();
const cors = require("cors");
const AuthMiddleware = require("../middlewares/AuthMidleware.js");

// import AuthRouter from "./AuthRouter.js";
const AuthRouter = require("./Auth.router.js");
const MotelRouter = require("./Motel.router.js");
const RoomRouter = require("./Room.router.js");
// const UserRouter = require("./User.router.js");
// Middleware
app.use(cors());
app.use(express.json());
const router = express.Router();

app.use("/auth", AuthRouter);
app.use("/motel", AuthMiddleware, MotelRouter);
app.use("/room", AuthMiddleware, RoomRouter);
// router.use("/user", UserRouter);

module.exports = app;
