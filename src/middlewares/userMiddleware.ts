import { Request, Response, NextFunction } from "express";
import errors from "@/errors";
import userRepository from "@/repositories/userRepository";
import { Session } from "@/protocols";
import jwt from "jsonwebtoken";

async function checkConflict(req: Request, res: Response, next: NextFunction) {
  const { email, username } = req.body;
  try {
    const conflict = await userRepository.findUser(email, username);
    if (conflict) {
      throw errors.conflictError();
    }
    next();
  } catch (err) {
    next(err);
  }
}

async function checkUserCredentials(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!authorization || !token) {
    return next();
  }
  try {
    const session = jwt.verify(token, process.env.JWT_SECRET) as Session;
    const user = await userRepository.findUser(session.email);
    delete user.password;
    res.locals.user = user;
    next();
  } catch (err) {
    next();
  }
}

export default { checkConflict, checkUserCredentials };
