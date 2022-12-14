const asyncHandler = require("express-async-handler");

const Template = require("../models/templateModel");

const getTemplate = asyncHandler(async (req, res) => {

  const template = await Template.find({})
  
  res.status(200).json({ template });
});

const createTemplate = asyncHandler(async (req, res) => {

  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  if (!req.body.code) {
    res.status(400);
    throw new Error("Please add a code");
  }

  if (req.body.img && req.body.img.length > 250000) {
    res.status(400);
    throw new Error("The image must not weigh more than 250kb");
  }

  const template = await Template.create({
    name: req.body.name,
    code: req.body.code,
    img: req.body.img
  });

  res.status(200).json({ template });
});

const updateTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  if (!template) {
    res.status(400);
    throw new Error("Template not found");
  }

  if (req.body.img && req.body.img.length > 250000) {
    res.status(400);
    throw new Error("The image must not weigh more than 250kb");
  }

  const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedTemplate);
});

const deleteTemplate = asyncHandler(async (req, res) => {
  const template = await Template.findById(req.params.id);
  if (!template) {
    res.status(400);
    throw new Error("Template not found");
  }

  await template.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
