import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  title: String,
  completed: Boolean,
  deadline: String,
  priority: String,
  description: String,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
