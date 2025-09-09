import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import PSNRouter from "./Routes/PSNRouter.js";
import CoRouter from "./Routes/CoRouter.js";
import MaterialRouter from "./Routes/MaterialRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/psn", PSNRouter);
app.use("/api/co", CoRouter);
app.use("/api/material", MaterialRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

// ✅ Start server
const PORT = process.env.PORT || 5009;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
