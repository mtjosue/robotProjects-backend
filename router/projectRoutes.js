import express from "express";
const router = express.Router();
import {
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../controller/projectController.js";

router.route("/").get(fetchProjects);
router.route("/").post(createProject);
router.route("/:id").delete(deleteProject).put(updateProject);

export default router;
