import express from "express";
import { searchRawMaterials } from "../controllers/MaterialController.js";

const MaterialRouter = express.Router();

//search raw materials
MaterialRouter.get("/search", searchRawMaterials);

export default MaterialRouter;