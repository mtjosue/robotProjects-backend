import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Robot from "../models/robotModel.js";

const fetchRobots = asyncHandler(async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
});

const createRobot = asyncHandler(async (req, res) => {
  const { name, fuelType, fuelLevel, imageUrl, assignedProjects } = req.body;
  const newRobot = new Robot({
    name,
    fuelType,
    fuelLevel,
    imageUrl,
    assignedProjects,
  });

  try {
    await newRobot.save();
    res.status(201).json(newRobot);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
});

const deleteRobot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Robot ID");
  }
  try {
    await Robot.findByIdAndRemove(id);
    res.json({ message: "Robot Deleted Successfully" });
  } catch (error) {
    console.log("Error : ", error);
  }
});

const updateRobot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, fuelType, fuelLevel, imageUrl, assignedProjects } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No Robot found with ID : ${id}`);
  } else {
    const updatingRobot = await Robot.findById(id);
    updatingRobot.name = name || updatingRobot.name;
    updatingRobot.fuelType = fuelType || updatingRobot.fuelType;
    updatingRobot.fuelLevel = fuelLevel || updatingRobot.fuelLevel;
    updatingRobot.imageUrl = imageUrl || updatingRobot.imageUrl;
    updatingRobot.assignedProjects =
      assignedProjects || updatingRobot.assignedProjects;

    const updatedRobot = await updatingRobot.save();
    res.json(updatedRobot);
  }
});

const updateAllProjectsOnRobot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //
  const data = req.body;
  //
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No Robot found with ID : ${id}`);
  } else {
    //
    const robot = await Robot.findById(id);
    //
    robot.assignedProjects = data;
    //
    const updatedRobot = await robot.save();
    //
    res.json(updatedRobot);
  }
});

export {
  fetchRobots,
  createRobot,
  deleteRobot,
  updateRobot,
  updateAllProjectsOnRobot,
};
