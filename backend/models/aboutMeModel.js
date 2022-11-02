const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    descEn: {
      type: String,
      required: [true, "Please add a desc"],
    },
    descEs: {
      type: String,
      required: [true, "Please add a desc"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AboutMe", aboutSchema);
