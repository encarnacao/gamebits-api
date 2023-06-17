import { Request, Response, NextFunction } from "express";
import errors from "@/errors";
import userRepository from "@/repositories/userRepository";

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

export default { checkConflict };
