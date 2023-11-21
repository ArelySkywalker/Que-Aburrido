import { RequestHandler } from "express";
import ActivityModel from "../models/activity";

export const getActivities: RequestHandler = async (req, res, next) => {
  try {
    const activity = await ActivityModel.find().exec();
    res.status(200).json({ activity });
  } catch (error) {
    next(error);
  }
};

export const getActivity: RequestHandler = async (req, res, next) => {
  const activityId = req.params.activityId;
  try {
    const activity = await ActivityModel.findById(activityId).exec();
    res.status(200).json({ activity });
  } catch (error) {
    next(error);
  }
};

export const createActivity: RequestHandler = async (req, res, next) => {
  const activityType = req.body.activityType;
  const participants = req.body.participants;
  try {
    const newActivity = await ActivityModel.create({
      activityType,
      participants,
    });
    res.status(201).json({ activity: newActivity });
  } catch (error) {
    next(error);
  }
};
