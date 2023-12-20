import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
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
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      throw createHttpError(400, "Invalid activity ID.");
    }

    const activity = await ActivityModel.findById(activityId).exec();

    if (!activity) {
      throw createHttpError(404, "Activity not found.");
    }

    res.status(200).json({ activity });
  } catch (error) {
    next(error);
  }
};

interface CreateActivityBody {
  activityType?: string;
  participants?: number;
}

export const createActivity: RequestHandler<
  unknown,
  unknown,
  CreateActivityBody,
  unknown
> = async (req, res, next) => {
  const activityType = req.body.activityType;
  const participants = req.body.participants;
  try {
    if (!activityType) {
      throw createHttpError(400, "Activity must have an activity type.");
    }

    const newActivity = await ActivityModel.create({
      activityType,
      participants,
    });
    res.status(201).json({ activity: newActivity });
  } catch (error) {
    next(error);
  }
};

interface UpdateActivityParams {
  activityId: string;
}

interface UpdateActivityBody {
  activityType?: string;
  participants?: number;
}

export const updateActivity: RequestHandler<
  UpdateActivityParams,
  unknown,
  UpdateActivityBody,
  unknown
> = async (req, res, next) => {
  const activityId = req.params.activityId;
  const newActivityType = req.body.activityType;
  const newParticipants = req.body.participants;

  try {
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      throw createHttpError(400, "Invalid activity ID.");
    }

    if (!newActivityType) {
      throw createHttpError(400, "Activity must have an activity type.");
    }

    const activity = await ActivityModel.findById(activityId).exec();

    if (!activity) {
      throw createHttpError(404, "Activity not found.");
    }

    activity.activityType = newActivityType;
    activity.participants = newParticipants
      ? newParticipants
      : activity.participants;
    const updatedActivity = await activity.save();

    res.status(200).json({ activity: updatedActivity });
  } catch (error) {
    next(error);
  }
};

export const deleteActivity: RequestHandler = async (req, res, next) => {
  const activityId = req.params.activityId;
  try {
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      throw createHttpError(400, "Invalid activity ID.");
    }

    const activity = await ActivityModel.findById(activityId).exec();

    if (!activity) {
      throw createHttpError(404, "Activity not found.");
    }

    await activity.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
