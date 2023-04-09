require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const router = require("./routes/index.js");
const AuthMiddleware = require("./middlewares/AuthMidleware.js");
const MotelRouter = require("./routes/Motel.router.js");

// Database Connection
connection();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", router);
// app.use("/api/motel", AuthMiddleware, MotelRouter);


const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`
  \x1b[46m******************************************************* \x1b[0;30m
  \x1b[46m******************** SERVER RUNING ******************** \x1b[0;30m
  \x1b[46m**********************\x1b[0;32m PORT ${PORT} \x1b[46m********************** \x1b[0;30m
  \x1b[46m******************************************************* \x1b[0;30m
  \x1b[0;30m
  `)
  // console.log(``)
);

app.get("/", (req, res) => {
  res.send(`
  ******************** SERVER RUNING ******************** `);
});
