const mongoose = require("mongoose");

const degreeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    nameEs: {
      type: String,
      required: [true, "Please add a name"],
    },
    descriptionEs: {
      type: String,
    },
    nameEn: {
      type: String,
      required: [true, "Please add a name"],
    },
    descriptionEn: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Degree", degreeSchema);
