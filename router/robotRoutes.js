import express from "express";
const router = express.Router();
import {
  fetchRobots,
  createRobot,
  deleteRobot,
  updateRobot,
} from "../controller/robotController.js";

router.route("/").get(fetchRobots);
router.route("/").post(createRobot);
router.route("/:id").delete(deleteRobot).put(updateRobot);

export default router;
