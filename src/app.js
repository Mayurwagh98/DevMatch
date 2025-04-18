const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.router");
const profileRouter = require("./routes/profile.router");
const requestRouter = require("./routes/request.router");
const connectionRequestRouter = require("./routes/connectionRequest.router");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", connectionRequestRouter);

connectDB()
  .then(() => {
    console.log("connected to database");
    app.listen(8000, () => {
      console.log("server is running on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
