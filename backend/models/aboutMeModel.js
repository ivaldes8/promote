const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    descEn: {
      type: String,
      unique: true,
      required: [true, "Please add a desc"],
    },
    descEs: {
      type: String,
      unique: true,
      required: [true, "Please add a desc"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);
