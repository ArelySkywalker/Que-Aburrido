import "dotenv/config";
import MongoStore from "connect-mongo";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import activityRoutes from "./routes/activities";
import userRoutes from "./routes/users";
import env from "./util/validateEnv";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env().SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env().MONGO_CONNECTION_STRING,
    }),
  })
);

app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred.";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  res.status(statusCode).json({ message: errorMessage });
});

export default app;
