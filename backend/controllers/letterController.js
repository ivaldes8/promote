const asyncHandler = require("express-async-handler");

const Letter = require("../models/letterModel");

const getLetters = asyncHandler(async (req, res) => {
  const letter = await Letter.find({ user: req.user.id }, { user: 0 });

  res.status(200).json({ letter });
});

const createLetter = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const letter = await Letter.create({
    user: req.user.id,
    name: req.body.name,
    desc: req.body.desc,
  });

  res.status(200).json({ letter });
});

const updateLetter = asyncHandler(async (req, res) => {
  const letter = await Letter.findById(req.params.id);
  if (!letter) {
    res.status(400);
    throw new Error("Letter not found");
  }

  if (letter.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Letter can only be modified by the user who create them and for the administrator"
    );
  }

  const updatedLetter = await Letter.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedLetter);
});

const deleteLetter = asyncHandler(async (req, res) => {
  const letter = await Letter.findById(req.params.id);

  if (!letter) {
    res.status(400);
    throw new Error("Letter not found");
  }

  if (letter.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Letter can only be deleted by the user who create them and for the administrator"
    );
  }

  await letter.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLetters,
  createLetter,
  updateLetter,
  deleteLetter,
};
