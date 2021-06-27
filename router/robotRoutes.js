import express from "express";
const router = express.Router();
import {
  fetchRobots,
  createRobot,
  deleteRobot,
  updateRobot,
  updateAllProjectsOnRobot,
  // assignProjectsAndRobot,
} from "../controller/robotController.js";
import {
  updateRobotOnAllProjects,
  deleteRobotFromProjects,
} from "../controller/projectController.js";

router.route("/").get(fetchRobots);
router.route("/").post(createRobot);
router.route("/:id").delete(deleteRobot).put(updateRobot);
//    /robots/:id/projects
router.route("/:id/projects").put(updateAllProjectsOnRobot);
//    /robots/:id/project
router.route("/:id/project").put(updateRobotOnAllProjects);
//
router.route("/:id/deleteRobot").put(deleteRobotFromProjects);

export default router;

//60d78eec20f90d2ffca7de06
//60d78eec20f90d2ffca7de06
