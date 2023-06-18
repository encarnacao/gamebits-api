import { Request, Response, NextFunction } from "express";
import { idParams } from "@/protocols";
import followServices from "@/services/followServices";
import httpStatus from "http-status";

async function followUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params as unknown as idParams;
  const user = res.locals.user;
  try {
    const follow = await followServices.followUser(user.id, Number(id));
    res.status(httpStatus.CREATED).send(follow);
  } catch (err) {
    next(err);
  }
}

async function unfollowUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params as unknown as idParams;
  const user = res.locals.user;
  try {
    await followServices.unfollowUser(user.id, Number(id));
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (err) {
    next(err);
  }
}

async function getFollowers(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params as unknown as idParams;
  try {
    const followers = await followServices.getFollowers(Number(id));
    res.send(followers);
  } catch (err) {
    next(err);
  }
}

async function getFollowing(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params as unknown as idParams;
  try {
    const following = await followServices.getFollowings(Number(id));
    res.send(following);
  } catch (err) {
    next(err);
  }
}

export { followUser, unfollowUser, getFollowers, getFollowing };
