const asyncHandler = require("express-async-handler");

const Profile = require("../models/profileModel");

const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.find({});

  res.status(200).json({ profile });
});

const createProfile = asyncHandler(async (req, res) => {
  if (!req.body.img) {
    res.status(400);
    throw new Error("Please add a image");
  }

  if (req.body.img.length > 250000) {
    res.status(400);
    throw new Error("The image must not weigh more than 250kb");
  }

  if (req.body.active) {
    const aciveProfiles = await Profile.updateMany(
      { active: true },
      { active: false }
    );
  }
  const profile = await Profile.create({
    user: req.user.id,
    img: req.body.img,
    active: req.body.active,
  });

  res.status(200).json({ profile });
});

const updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) {
    res.status(400);
    throw new Error("Profile picture not found");
  }

  if (req.body.img && req.body.img.length > 250000) {
    res.status(400);
    throw new Error("The image must not weigh more than 250kb");
  }

  if (req.body.active) {
    const aciveProfiles = await Profile.updateMany(
      { active: true },
      { active: false }
    );
  }

  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedProfile);
});

const deleteProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (!profile) {
    res.status(400);
    throw new Error("Profile picture not found");
  }

  await profile.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
