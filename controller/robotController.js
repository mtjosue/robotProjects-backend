import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Robot from "../models/robotModel.js";
import Project from "../models/projectModel.js";

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

const updateProjectOnAllRobots = asyncHandler(async (req, res) => {
  //
  const { id } = req.params;
  //
  const data = req.body;
  //
  // console.log("line 89 data : ".toUpperCase(), data);
  //
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //
    return res.status(404).send(`No Robot found with ID : ${id}`);
    //
  } else {
    //
    const project = await Project.findById(id);
    //
    // console.log("line 99 project : ".toUpperCase(), project);
    //
    const updateProjectOnRobots = data.map(async (robot) => {
      //
      // console.log("line 103 robot : ".toUpperCase(), robot); ////////////////////////////////////////
      //
      const robotFound = await Robot.findById(robot._id);
      //
      // console.log("PROJECTFOUND.ASSIGNEDORBOTS : ");
      //
      console.log("line 109 robotFound : ".toUpperCase(), robotFound);
      //
      // if (projectFound.assignedRobots.length > 0) {
      //
      if (
        robotFound.assignedProjects.findIndex(
          (p) => p.title === project.title
        ) === -1
      ) {
        //

        robotFound.assignedProjects = [...robotFound.assignedProjects, project];
        //
        const updatedRobot = await robotFound.save();
        //
        console.log("line 124 updatedRobot : ".toUpperCase(), updatedRobot); ////////////////////////////////
        //
        return updatedRobot;
        //
        // }
      }
      // else if (
      //   projectFound.assignedRobots.findIndex((r) => r.name === robot.name) !==
      //   -1
      // ) {
      //   //
      //   const alreadyThere =
      //   //
      // }
      else {
        //
        robotFound.assignedProjects = [...robotFound.assignedProjects];
        //
        const updatedRobot = await robotFound.save();
        //
        console.log("line 144 updatedRobot : ".toUpperCase(), updatedRobot); ////////////////////////////////////////
        //
        return updatedRobot;
        //
      }
      //
    });
    //
    //updateRobotOnProjects ENDS ITERATING.
    //
    const updatedRobots = await Promise.all(updateProjectOnRobots);
    //
    console.log("line 156 updatedRobots : ".toUpperCase(), updatedRobots); ///////////////////////////////////////////
    //
    res.json(updatedRobots);
    //
  }
});
//
//
//
//
const deleteProjectFromRobots = asyncHandler(async (req, res) => {
  //
  const { id } = req.params;
  //
  const data = req.body;
  //
  // console.log("line 165 data : ".toUpperCase(), data);
  //
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //
    return res.status(404).send(`No Robot found with ID : ${id}`);
    //
  } else {
    //
    const project = await Project.findById(id);

    // console.log("line 175 robot : ".toUpperCase(), robot);/////////////////////////////////////////////
    //
    //
    //
    const deleteProjectFromRobots = data.map(async (robot) => {
      //
      //
      //
      //
      const robotFound = await Robot.findById(robot._id);
      //
      // console.log("line 179 projectFound : ".toUpperCase(), projectFound);////////////////////////////////////////////
      //
      // console.log(
      //   "line 179 projectFound.assignedRobots : ".toUpperCase(),////////////////////////////////////////
      //   projectFound.assignedRobots
      // );
      //
      // const updatedRobotsInProject = projectFound.assignedRobots.filter((r) => {
      //   if (r._id === robot._id) {
      //     return null;
      //   } else {
      //     return r;
      //   }
      // });
      //
      const updatedProjectsInRobot = robotFound.assignedProjects.filter(
        (p) => p.title !== project.title
      );
      // const updatedRobotsInProject = projectFound.assignedRobots.filter((r) => {
      //   if (r._id !== id) {
      //     console.log("line 211 id :".toUpperCase(), id);
      //     //
      //     console.log("line 200 r : ".toUpperCase(), r);
      //     return r;
      //   } else {
      //     return null;
      //   }
      // });
      //
      // console.log(
      //   "line 206 updatedRobotsInProject : ".toUpperCase(),/////////////////////////////////////
      //   updatedRobotsInProject
      // );
      //
      robotFound.assignedProjects = updatedProjectsInRobot;
      //
      // console.log(
      //   "line 194 projectFound.assignedRobots".toUpperCase(),
      //   projectFound.assignedRobots
      // );
      //
      const updatedRobot = await robotFound.save();
      //
      return updatedRobot;
      //
    });
    //
    const updatedRobots = await Promise.all(deleteProjectFromRobots);
    //
    // console.log("line 200 updatedProjects : ".toUpperCase(), updatedProjects);/////////////////////////////////////////////////
    //
    res.json(updatedRobots);
    //
  }
});
//
//
//

export {
  fetchRobots,
  createRobot,
  deleteRobot,
  updateRobot,
  updateAllProjectsOnRobot,
  updateProjectOnAllRobots,
  deleteProjectFromRobots,
};
