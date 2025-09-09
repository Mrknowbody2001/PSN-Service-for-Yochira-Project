import express from "express";
import {
  getApprovedCo,
  getCustomerOrderById,
} from "../controllers/COController.js";

const CoRouter = express.Router();

//get all approved customer orders
CoRouter.get("/approved-all", getApprovedCo);

//get customer details in one CO
CoRouter.get("/:id", getCustomerOrderById);

export default CoRouter;
