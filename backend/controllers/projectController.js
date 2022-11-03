const asyncHandler = require("express-async-handler");

const Project = require("../models/projectModel");

const getProjects = asyncHandler(async (req, res) => {
  const project = await Project.find({ user: req.user.id }, { user: 0 });

  res.status(200).json({ project });
});

const createProject = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name");
  }

  const project = await Project.create({
    user: req.user.id,
    name: req.body.name,
    desc: req.body.desc,
  });

  res.status(200).json({ project });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }

  if (project.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Project can only be modified by the user who create them and for the administrator"
    );
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedProject);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }

  if (project.user.toString() !== req.user.id && req.user.role !== "Admin") {
    res.status(400);
    throw new Error(
      "Project can only be deleted by the user who create them and for the administrator"
    );
  }

  await project.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
