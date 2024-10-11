import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  // @ts-expect-error Property 'userId' does not exist on type 'Session & Partial<SessionData>'.
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated.");
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select("+email")
      .exec();
    if (!user) {
      throw createHttpError(404, "User not found.");
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Missing required fields.");
    }

    const existingUsername = await UserModel.findOne({ username }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "Userame already exists. Please choose a different one or login instead."
      );
    }

    const existingEmail = await UserModel.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email already exists. Please login instead."
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    });

    // @ts-expect-error Property 'userId' does not exist on type 'Session & Partial<SessionData>'.
    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const passwordRaw = req.body.password;

  try {
    if (!username || !passwordRaw) {
      throw createHttpError(400, "Missing required fields.");
    }

    const user = await UserModel.findOne({ username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials.");
    }

    const passwordMatches = await bcrypt.compare(passwordRaw, user.password);
    if (!passwordMatches) {
      throw createHttpError(401, "Invalid credentials.");
    }

    // @ts-expect-error Property 'userId' does not exist on type 'Session & Partial<SessionData>'.
    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }
    res.status(204).end();
  });
};
