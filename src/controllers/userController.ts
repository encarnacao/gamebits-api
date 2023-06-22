import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import userServices from "@/services/userServices";
import jwt from "jsonwebtoken";
import { SignInBody, UserParams } from "@/protocols";
import httpStatus from "http-status";
import { users } from "@prisma/client";

async function createUser(req: Request, res: Response, next: NextFunction) {
  const userData = req.body as UserParams;
  try {
    const create = await userServices.createUser(userData);
    delete create.password;
    res.status(httpStatus.CREATED).send(create);
  } catch (err) {
    next(err);
  }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  const userData = req.body as SignInBody;
  try {
    const user = await userServices.getUserByEmail(userData);
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (err) {
    next(err);
  }
}

async function findUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const user = await userServices.getUserById(Number(id));
    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function findUsers(req: Request, res: Response, next: NextFunction) {
  const { username } = req.query as Pick<UserParams, "username">;
  try {
    const users = await userServices.findUsersByUsername(username);
    res.send(users);
  } catch (err) {
    next(err);
  }
}

async function findAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userServices.findAllUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
}

async function getMe(req: Request, res: Response, next: NextFunction) {
  const user: users = res.locals.user;
  try {
    const userData = await userServices.getUserById(user.id);
    res.send(userData);
  } catch (err) {
    next(err);
  }
}

async function findUsername(req: Request, res: Response, next: NextFunction) {
  const { username } = req.params;
  try {
    const user = await userServices.getUserByUsername(username);
    res.send(user);
  } catch (err) {
    next(err);
  }
}

export {
  createUser,
  signIn,
  findUser,
  findUsers,
  findAllUsers,
  getMe,
  findUsername,
};
