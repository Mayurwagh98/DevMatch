const { default: mongoose } = require("mongoose");
const validator = require("validator");

const User = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 10,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Enter a Strong Password: " + value);
      }
    },
  },
  age: { type: Number, min: 18 },
  photoUrl: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1559116315-702b0b4774ce?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHVtbXl8ZW58MHx8MHx8fDA%3D",
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Invalid Image Url");
      }
    },
  },
  skills: {
    type: [String],
  },
});

const UserModel = mongoose.model("Users", User);

module.exports = UserModel;
