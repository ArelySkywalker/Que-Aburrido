import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import ActivityModel from "./models/activity";

const app = express();

app.get("/", async (req, res, next) => {
  try {
    const activity = await ActivityModel.find().exec();
    res.status(200).json({ activity });
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(new Error("Not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred.";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ message: errorMessage });
});

export default app;
