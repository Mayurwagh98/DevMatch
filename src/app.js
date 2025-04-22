const express = require("express");
const connectDB = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.router");
const profileRouter = require("./routes/profile.router");
const connectionRequestRouter = require("./routes/connectionRequest.router");
const requestesReceived = require("./routes/user.router");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", requestesReceived);

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
