const asyncHandler = require("express-async-handler");

const CV = require("../models/cvModel");

const getCV = asyncHandler(async (req, res) => {
  const cv = await CV.find({ user: req.user.id });

  res.status(200).json({ cv });
});

const getPublicCV = asyncHandler(async (req, res) => {
  const cv = await CV.find({ active: true });

  res.status(200).json({ cv });
});

const createCV = asyncHandler(async (req, res) => {
  if (!req.body.profile) {
    res.status(400);
    throw new Error("Please select a profile picture");
  }

  if (!req.body.template) {
    res.status(400);
    throw new Error("Please select a template");
  }

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  if (!req.body.skills) {
    res.status(400);
    throw new Error("Please select at lease one skill");
  }

  const cv = await CV.create({
    user: req.user.id,
    name: req.body.name,
    profile: req.body.profile,
    template: req.body.template,
    skills: req.body.skills,
    about: req.body.about,
    experience: req.body.experience,
    project: req.body.project,
    language: req.body.language,
    degree: req.body.degree,
    letter: req.body.letter,
    info: req.body.info,
    headerColor: req.body.headerColor,
    primaryColor: req.body.primaryColor,
    secundaryColor: req.body.secundaryColor
  });

  res.status(200).json({ cv });
});

const updateCV = asyncHandler(async (req, res) => {
  const cv = await CV.findById(req.params.id);
  if (!cv) {
    res.status(400);
    throw new Error("CV not found");
  }

  const updatedCV = await CV.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCV);
});

const deleteCV = asyncHandler(async (req, res) => {
  const cv = await CV.findById(req.params.id);
  if (!cv) {
    res.status(400);
    throw new Error("CV not found");
  }

  await cv.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getCV,
  getPublicCV,
  createCV,
  updateCV,
  deleteCV,
};
