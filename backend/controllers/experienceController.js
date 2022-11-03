const asyncHandler = require("express-async-handler");

const Experience = require("../models/experienceModel");

const getExperiences = asyncHandler(async (req, res) => {
  const exp = await Experience.find({ user: req.user.id }, { user: 0 });

  res.status(200).json({ exp });
});

const createExperience = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const exp = await Experience.create({
    user: req.user.id,
    name: req.body.name,
    desc: req.body.desc,
  });

  res.status(200).json({ exp });
});

const updateExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  if (!exp) {
    res.status(400);
    throw new Error("Experience not found");
  }

  if (exp.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Experience can only be modified by the user who create them and for the administrator"
    );
  }

  const updatedExp = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedExp);
});

const deleteExperience = asyncHandler(async (req, res) => {
  const exp = await Experience.findById(req.params.id);

  if (!exp) {
    res.status(400);
    throw new Error("Experience not found");
  }

  if (exp.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Experience can only be deleted by the user who create them and for the administrator"
    );
  }

  await exp.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
