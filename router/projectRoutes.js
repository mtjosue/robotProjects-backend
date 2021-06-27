import express from "express";
const router = express.Router();
import {
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
  // updateAllRobotsOnProject,
  updateRobotOnAllProjects,
} from "../controller/projectController.js";

router.route("/").get(fetchProjects);
router.route("/").post(createProject);
router.route("/:id").delete(deleteProject).put(updateProject);
//projects/:id/robots
// router.route("/:id/robots").put(updateAllRobotsOnProject);
//projects/:id/robot
// router.route("/:id/robot").put(updateRobotOnAllProjects);

export default router;
