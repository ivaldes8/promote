const mongoose = require("mongoose");

const cvSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add at lease one profile image"],
      ref: "Profile",
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add at lease one template"],
      ref: "Template",
    },
    active: {
      type: Boolean,
      default: false
    },
    letters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Letter",
      },
    ],
    infos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Info",
      },
    ],
    degrees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Degree",
      },
    ],
    experiencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      },
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add at lease one skill"],
        ref: "Skill",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CV", cvSchema);
