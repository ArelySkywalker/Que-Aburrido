import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import activityRoutes from "./routes/activities";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/activities", activityRoutes);

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
