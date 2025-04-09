const { connect } = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URL);
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    throw err; // Ensure the error propagates to `.catch()`
  }
};
module.exports = connectDB;
