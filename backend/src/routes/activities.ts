import express from "express";
import * as ActivitiesController from "../controllers/activities";

const router = express.Router();

router.get("/", ActivitiesController.getActivities);

router.get("/:activityId", ActivitiesController.getActivity);

router.post("/", ActivitiesController.createActivity);

export default router;
