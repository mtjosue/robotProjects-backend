import connectDB from "../config/db.js";
connectDB();
import colors from "colors";
import mongoose from "mongoose";
import Robot from "../models/robotModel.js";
import Project from "../models/projectModel.js";

const seedData = async () => {
  await Robot.deleteMany();
  await Project.deleteMany();

  const robotsBatch = [
    {
      name: "Rokusho",
      fuelType: "electric",
      fuelLevel: 62.5,
      imageUrl:
        "https://vignette.wikia.nocookie.net/medabots/images/5/52/M4-KWG-1.gif/revision/latest?cb=20170925023814",
      assignedProjects: 0,
    },
    {
      name: "Arcbeetle",
      fuelType: "electric",
      fuelLevel: 87.9,
      imageUrl:
        "https://vignette.wikia.nocookie.net/medabots/images/2/22/M4-KBT-4.gif/revision/latest?cb=20170917060628",
      assignedProjects: 0,
    },
    {
      name: "Redrun",
      fuelType: "gas",
      fuelLevel: 65.1,
      imageUrl:
        "https://vignette.wikia.nocookie.net/medabots/images/a/a1/M4-DVL-3.gif/revision/latest?cb=20171012184515",
      assignedProjects: 0,
    },
    {
      name: "Sumilidon",
      fuelType: "diesel",
      fuelLevel: 49,
      imageUrl:
        "https://vignette.wikia.nocookie.net/medabots/images/1/1f/M4-STG-0.gif/revision/latest?cb=20170917060040",
      assignedProjects: 0,
    },
  ];

  const projectsBatch = [
    {
      title: "Finish Fullstack",
      deadline: `${new Date()}`,
      priority: 5,
      completed: false,
      description: "Finish this project ASAP",
    },
    {
      title: "Go to Monaco",
      deadline: `${new Date()}`,
      priority: 5,
      completed: false,
      description: "Finally visit a far away place of my own volition",
    },
    {
      title: "Have Fun",
      deadline: `${new Date()}`,
      priority: 5,
      completed: false,
      description:
        "Try to have as much fun as possible on the way, regret is not an option.",
    },
    {
      title: "Finish Fullstack JPFP",
      deadline: `${new Date()}`,
      priority: 9,
      completed: false,
      description:
        "Finish this shit so we can start working on dope platforms as projects.",
    },
  ];

  try {
    const robots = await Robot.collection.insertMany(robotsBatch);
    console.log(":D Robots Seeded Successfully".cyan, robots);
    const projects = await Project.collection.insertMany(projectsBatch);
    console.log(":D Projects Seeded Successfully".cyan, projects);
  } catch (error) {
    console.log("err :", error);
  }
};

(async () => {
  await seedData();
  mongoose.disconnect();
  console.log("Disconnected From MongoDB Successfully");
})();
