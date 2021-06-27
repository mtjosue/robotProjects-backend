import mongoose from "mongoose";

const robotSchema = mongoose.Schema({
  name: String,
  fuelType: String,
  fuelLevel: Number,
  imageUrl: String,
  assignedProjects: Array,
});

const Robot = mongoose.model("Robot", robotSchema);

export default Robot;
