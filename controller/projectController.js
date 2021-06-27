import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Project from "../models/projectModel.js";
import Robot from "../models/robotModel.js";

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

//---------------------------------------------------------------------------------------------

// const updateAllRobotsOnProject = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const data = req.body;
//   // console.log(
//   //   "The data from the req.body in updateProjectRobots controller : ",
//   //   data
//   // );
//   // console.log(
//   //   "The id destructured from the req.params in updateProjectRobots : ",
//   //   id
//   // );

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).send(`No Project found with ID : ${id}`);
//   } else {
//     const project = await Project.findById(id);

//     // console.log("The project BEFORE updating : ", project);

//     project.assignedRobots = data;

//     // console.log("--------------------------------------------------------");

//     // console.log("The project AFTER updating : ", project);

//     const updatedProject = await project.save();
//     // console.log(
//     //   "The project we are using to update the redux : ",
//     //   updatedProject
//     // );
//     res.json(updatedProject);
//   }
// });

const updateRobotOnAllProjects = asyncHandler(async (req, res) => {
  //
  const { id } = req.params;
  //
  const data = req.body;
  //
  console.log("line 106 data : ".toUpperCase(), data);
  //
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //
    return res.status(404).send(`No Robot found with ID : ${id}`);
    //
  } else {
    //
    const robot = await Robot.findById(id);
    //
    console.log("line 116 robot : ".toUpperCase(), robot);
    //
    const updateRobotOnProjects = data.map(async (project) => {
      //
      console.log("line 120 PROJECT : ".toUpperCase(), project); ////////////////////////////////////////
      //
      const projectFound = await Project.findById(project._id);
      //
      // console.log("PROJECTFOUND.ASSIGNEDORBOTS : ");
      //
      console.log("line 122 projectFound : ".toUpperCase(), projectFound);
      //
      // if (projectFound.assignedRobots.length > 0) {
      //
      if (
        projectFound.assignedRobots.findIndex((r) => r.name === robot.name) ===
        -1
      ) {
        //
        projectFound.assignedRobots = [...projectFound.assignedRobots, robot];
        //
        const updatedProject = await projectFound.save();
        //
        console.log("line 139 updatedProject : ".toUpperCase(), updatedProject); ////////////////////////////////
        //
        return updatedProject;
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
        projectFound.assignedRobots = [...projectFound.assignedRobots];
        //
        const updatedProject = await projectFound.save();
        //
        console.log("line 150 updatedProject : ".toUpperCase(), updatedProject); ////////////////////////////////////////
        //
        return updatedProject;
        //
      }
      //
    });
    //
    //updateRobotOnProjects ENDS ITERATING.
    //
    const updatedProjects = await Promise.all(updateRobotOnProjects);
    //
    console.log("line 161 updatedProjects : ".toUpperCase(), updatedProjects); ///////////////////////////////////////////
    //
    res.json(updatedProjects);
    //
  }
});

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

const deleteRobotFromProjects = asyncHandler(async (req, res) => {
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
    const robot = await Robot.findById(id);

    // console.log("line 175 robot : ".toUpperCase(), robot);/////////////////////////////////////////////
    //
    //
    //
    const deleteRobotFromProjects = data.map(async (project) => {
      //
      //
      //
      //
      const projectFound = await Project.findById(project._id);
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
      const updatedRobotsInProject = projectFound.assignedRobots.filter(
        (r) => r.name !== robot.name
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
      projectFound.assignedRobots = updatedRobotsInProject;
      //
      // console.log(
      //   "line 194 projectFound.assignedRobots".toUpperCase(),
      //   projectFound.assignedRobots
      // );
      //
      const updatedProject = await projectFound.save();
      //
      return updatedProject;
      //
    });
    //
    const updatedProjects = await Promise.all(deleteRobotFromProjects);
    //
    // console.log("line 200 updatedProjects : ".toUpperCase(), updatedProjects);/////////////////////////////////////////////////
    //
    res.json(updatedProjects);
    //
  }
});
//---------------------------------------------------------------------------------------------

export {
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
  // updateAllRobotsOnProject,
  updateRobotOnAllProjects,
  deleteRobotFromProjects,
};
