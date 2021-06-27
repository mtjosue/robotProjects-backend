import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  title: String,
  completed: Boolean,
  deadline: String,
  priority: String,
  description: String,
  selected: { type: Boolean, default: false },
  assignedRobots: Array,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
