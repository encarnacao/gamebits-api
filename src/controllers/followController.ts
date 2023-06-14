import { Request, Response, NextFunction } from "express";
import { idParams } from "@/protocols";
import followServices from "@/services/followServices";

async function followUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params as unknown as idParams;
  const user = res.locals.user;
  try {
    const follow = await followServices.followUser(user.id, Number(id));
    res.status(201).send(follow);
  } catch (err) {
    next(err);
  }
}

async function unfollowUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params as unknown as idParams;
  const user = res.locals.user;
  try {
    await followServices.unfollowUser(user.id, Number(id));
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

export { followUser, unfollowUser };
