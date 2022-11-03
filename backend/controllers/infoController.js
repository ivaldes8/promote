const asyncHandler = require("express-async-handler");

const Info = require("../models/infoModel");

const getInfos = asyncHandler(async (req, res) => {
  const info = await Info.find({ user: req.user.id }, { user: 0 });

  res.status(200).json({ info });
});

const createInfo = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const info = await Info.create({
    user: req.user.id,
    name: req.body.name,
    desc: req.body.desc,
  });

  res.status(200).json({ info });
});

const updateInfo = asyncHandler(async (req, res) => {
  const info = await Info.findById(req.params.id);
  if (!info) {
    res.status(400);
    throw new Error("Info not found");
  }

  if (info.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Info can only be modified by the user who create them and for the administrator"
    );
  }

  const updatedInfo = await Info.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedInfo);
});

const deleteInfo = asyncHandler(async (req, res) => {
  const info = await Info.findById(req.params.id);

  if (!info) {
    res.status(400);
    throw new Error("Info not found");
  }

  if (info.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Info can only be deleted by the user who create them and for the administrator"
    );
  }

  await info.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getInfos,
  createInfo,
  updateInfo,
  deleteInfo,
};
