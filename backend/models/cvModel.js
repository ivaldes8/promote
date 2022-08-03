const mongoose = require("mongoose");

const cvSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a user"],
      ref: "User",
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
    profile: {
      type: String,
      required: [true, "Please add at lease one profile image"],
    },
    skills: [
      {
        type: String,
        required: [true, "Please add at lease one skill"]
      },
    ],
    letters: [
      {
        type: String
      },
    ],
    infos: [
      {
        type: String
      },
    ],
    degrees: [
      {
        type: String,
      },
    ],
    experiencies: [
      {
        type: String,
      },
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CV", cvSchema);
