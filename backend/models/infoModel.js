const mongoose = require("mongoose");

const infoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    titleEs: {
      type: String,
      required: [true, "Please add a title"],
    },
    descriptionEs: {
      type: String,
    },
    titleEn: {
      type: String,
      required: [true, "Please add a title"],
    },
    descriptionEn: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Info", infoSchema);
