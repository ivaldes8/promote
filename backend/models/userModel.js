const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },
    phone: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    },
    role: {
        type: String,
        required: [true, "Please add a role"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema)
