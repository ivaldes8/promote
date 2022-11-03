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
      required: true,
    },
    template: {
      type: String,
      required: [true, "Please add at lease one template"],
    },
    profile: {
      type: String,
      required: [true, "Please add at lease one profile image"],
    },
    skills: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
        },
        value: { type: Number },
      },
    ],
    about: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
        },
        desc: {
          type: String,
        },
      },
    ],
    experience: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
        },
        desc: {
          type: String,
        },
      },
    ],
    project: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
        },
        desc: {
          type: String,
        },
      },
    ],
    language: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
        },
        desc: {
          type: String,
        },
      },
    ],
    degree: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
        },
        desc: {
          type: String,
        },
      },
    ],
    letter: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
        },
        desc: {
          type: String,
        },
      },
    ],
    info: [
      {
        name: {
          type: String,
          required: [true, "Please add a name"],
        },
        desc: {
          type: String,
        },
      },
    ],
    headerColor: {
      type: String,
      default: "#f0f8ff",
    },
    primaryColor: {
      type: String,
      default: "#2196f3",
    },
    secundaryColor: {
      type: String,
      default: "#b4b3b3",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CV", cvSchema);
