const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Please add a name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Skill", skillSchema);
