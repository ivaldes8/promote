const asyncHandler = require("express-async-handler");

const Skill = require("../models/skillModel");

const getSkill = asyncHandler(async (req, res) => {

  const skill = await Skill.find({},{user: 0})
  
  res.status(200).json({ skill });
});

const createSkill = asyncHandler(async (req, res) => {

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const skill = await Skill.create({
    name: req.body.name,
    user: req.user.id
  });

  res.status(200).json({ skill });
});

const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    res.status(400);
    throw new Error("Skill not found");
  }

  if(skill.user.toString() !== req.user.id && req.user.role !== 'Admin'){
    res.status(400);
    throw new Error("Skills can only be modified by the user who create them and for the administrator");
  }

  const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedSkill);
});

const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    res.status(400);
    throw new Error("Skill not found");
  }

  if(skill.user.toString() !== req.user.id && req.user.role !== 'Admin'){
    res.status(400);
    throw new Error("Skills can only be deleted by the user who create them and for the administrator");
  }

  await skill.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
