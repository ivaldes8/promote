const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    name: {
      type: String,
      unique: true,
      required: [true, "Please add a name"],
    },
    value: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);
