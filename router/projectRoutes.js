import express from "express";
const router = express.Router();
import {
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
  updateAllRobotsOnProject,
  completedChange,
} from "../controller/projectController.js";

import {
  updateProjectOnAllRobots,
  deleteProjectFromRobots,
} from "../controller/robotController.js";

router.route("/").get(fetchProjects);
router.route("/").post(createProject);
router.route("/:id").delete(deleteProject).put(updateProject);
//projects/:id/robots
router.route("/:id/robots").put(updateAllRobotsOnProject);
//projects/:id/robot
router.route("/:id/robot").put(updateProjectOnAllRobots);
//
router.route("/:id/deleteProject").put(deleteProjectFromRobots);
//
router.route("/:id/completed").put(completedChange);

export default router;
