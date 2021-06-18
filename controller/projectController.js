import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Project from "../models/projectModel.js";

const fetchProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

const createProject = asyncHandler(async (req, res) => {
  const { title, deadline, priority, completed, description } = req.body;
  const newProject = new Project({
    title,
    deadline,
    priority,
    completed,
    description,
  });

  try {
    console.log(newProject);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Robot ID");
  }
  try {
    await Project.findByIdAndRemove(id);
    res.json({ message: "Project Deleted Successfully" });
  } catch (error) {
    console.log("Error : ", error);
  }
});

const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, deadline, priority, completed, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No Project found with ID : ${id}`);
  } else {
    const updatingProject = await Project.findById(id);
    updatingProject.title = title || updatingProject.title;
    updatingProject.deadline = deadline || updatingProject.deadline;
    updatingProject.priority = priority || updatingProject.priority;
    updatingProject.completed = completed || updatingProject.completed;
    updatingProject.description = description || updatingProject.description;

    const updatedProject = await updatingProject.save();
    res.json(updatedProject);
  }
});

export { fetchProjects, createProject, deleteProject, updateProject };
