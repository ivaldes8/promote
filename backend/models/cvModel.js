const mongoose = require("mongoose");

const cvSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    name: {
      type: String,
      unique: [true, "This name is already taken"],
      required: true
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add at lease one template"],
      ref: "Template",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add at lease one profile image"],
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add at lease one skill"]
      },
    ],
    letters: [
      {
        type: mongoose.Schema.Types.ObjectId
      },
    ],
    infos: [
      {
        type: mongoose.Schema.Types.ObjectId
      },
    ],
    degrees: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    experiencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    active: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CV", cvSchema);
