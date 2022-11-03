const asyncHandler = require("express-async-handler");

const AboutMe = require("../models/aboutMeModel");

const getAboutMes = asyncHandler(async (req, res) => {
  const about= await AboutMe.find({ user: req.user.id }, { user: 0 });

  res.status(200).json({ about });
});

const createAboutMe = asyncHandler(async (req, res) => {
  if (!req.body.desc) {
    res.status(400);
    throw new Error("Please add a Desc");
  }

  const about = await AboutMe.create({
    user: req.user.id,
    desc: req.body.desc
  });

  res.status(200).json({ about });
});

const updateAboutMe = asyncHandler(async (req, res) => {
  const about = await AboutMe.findById(req.params.id);
  if (!about) {
    res.status(400);
    throw new Error("About not found");
  }

  if (about.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "About info can only be modified by the user who create them and for the administrator"
    );
  }

  const updatedAbout = await AboutMe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedAbout);
});

const deleteAboutMe = asyncHandler(async (req, res) => {
  const about = await AboutMe.findById(req.params.id);

  if (!about) {
    res.status(400);
    throw new Error("About info not found");
  }

  if (about.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "About info can only be deleted by the user who create them and for the administrator"
    );
  }

  await about.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAboutMes,
  createAboutMe,
  updateAboutMe,
  deleteAboutMe,
};
