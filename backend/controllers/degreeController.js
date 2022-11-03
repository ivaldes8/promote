const asyncHandler = require("express-async-handler");

const Degree = require("../models/degreeModel");

const getDegrees = asyncHandler(async (req, res) => {
  const degree = await Degree.find({ user: req.user.id }, { user: 0 });

  res.status(200).json({ degree });
});

const createDegree = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const degree = await Degree.create({
    user: req.user.id,
    name: req.body.name,
    desc: req.body.desc,
  });

  res.status(200).json({ degree });
});

const updateDegree = asyncHandler(async (req, res) => {
  const degree = await Degree.findById(req.params.id);
  if (!degree) {
    res.status(400);
    throw new Error("Degree not found");
  }

  if (degree.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Degree can only be modified by the user who create them and for the administrator"
    );
  }

  const updatedDegree = await Degree.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedDegree);
});

const deleteDegree = asyncHandler(async (req, res) => {
  const degree = await Degree.findById(req.params.id);

  if (!degree) {
    res.status(400);
    throw new Error("Degree not found");
  }

  if (degree.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Degree can only be deleted by the user who create them and for the administrator"
    );
  }

  await degree.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getDegrees,
  createDegree,
  updateDegree,
  deleteDegree,
};
