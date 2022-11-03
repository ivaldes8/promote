const asyncHandler = require("express-async-handler");

const Language = require("../models/languageModel");

const getLanguages = asyncHandler(async (req, res) => {
  const language = await Language.find({ user: req.user.id }, { user: 0 });

  res.status(200).json({ language });
});

const createLanguage = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const language = await Language.create({
    user: req.user.id,
    name: req.body.name,
    desc: req.body.desc,
  });

  res.status(200).json({ language });
});

const updateLanguage = asyncHandler(async (req, res) => {
  const language = await Language.findById(req.params.id);
  if (!language) {
    res.status(400);
    throw new Error("Language not found");
  }

  if (language.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Language can only be modified by the user who create them and for the administrator"
    );
  }

  const updatedLanguage = await Language.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedLanguage);
});

const deleteLanguage = asyncHandler(async (req, res) => {
  const language = await Language.findById(req.params.id);

  if (!language) {
    res.status(400);
    throw new Error("Language not found");
  }

  if (language.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Language can only be deleted by the user who create them and for the administrator"
    );
  }

  await language.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
