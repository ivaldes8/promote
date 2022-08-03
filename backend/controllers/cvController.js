const asyncHandler = require("express-async-handler");

const CV = require("../models/cvModel");

const getCV = asyncHandler(async (req, res) => {

  const cv = await CV.find({})
  
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

  if(!req.body.skills) {
    res.status(400);
    throw new Error("Please select at lease one skill");
  }

  const cv = await CV.create({
    user: req.user.id,
    profile: req.body.profile,
    template: req.body.template,
    active: req.body.active,
    skills: req.body.skills,
    letters: req.body.letters,
    infos: req.body.infos,
    degrees: req.body.degrees,
    experiencies: req.body.experiencies,
    letters: req.body.letters,
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
  })

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
  createCV,
  updateCV,
  deleteCV,
};
