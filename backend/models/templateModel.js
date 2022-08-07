const mongoose = require("mongoose");

const templateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    code: {
      type: String,
      required: [true, "Please add a code"],
      unique: true,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Templates", templateSchema);