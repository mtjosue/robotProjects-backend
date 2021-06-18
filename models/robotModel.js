import mongoose from "mongoose";

const robotSchema = mongoose.Schema({
  name: String,
  fuelType: String,
  fuelLevel: Number,
  imageUrl: String,
  assignedProjects: Number,
});

const Robot = mongoose.model("Robot", robotSchema);

export default Robot;
