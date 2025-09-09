import express from "express";

import {
  approvePsn,
  createPSN,
  finishPSN,
  getAllPSN,
  getFinishedPSN,
  getOnePendingPSN,
  getOneStartedPSN,
  getPendingPSN,
  getPSNNumber,
  getStartedPSN,
} from "../controllers/SPNController.js";
import PSN from "../models/PSN.js";

const PSNRouter = express.Router();

//get new psn no
PSNRouter.get("/psn-no", getPSNNumber);

//create psn
PSNRouter.post("/create-psn", createPSN);

//get all psn
PSNRouter.get("/all", getAllPSN);

//!get pending psn
PSNRouter.get("/pending/all", getPendingPSN);

//
//!get one pending psn by id
PSNRouter.get("/pending/:id", getOnePendingPSN);

//get started psn list
PSNRouter.get("/started/all", getStartedPSN);

//getOne started PSN by ID
PSNRouter.get("/started/:id", getOneStartedPSN);

//!approve psn
PSNRouter.put("/start/:id", approvePsn);

//!get all finished psn
 PSNRouter.get("/finished/all", getFinishedPSN);

//finish psn
PSNRouter.put("/finish/:id", finishPSN);
export default PSNRouter;
