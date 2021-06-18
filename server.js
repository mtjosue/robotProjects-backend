import express from "express";
import connectDB from "./config/db.js";
connectDB();
import robotRoutes from "./router/robotRoutes.js";
import projectRoutes from "./router/projectRoutes.js";

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use("/robots", robotRoutes);
app.use("/projects", projectRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`:D Server is listening/running on PORT : ${PORT}`.cyan);
});
