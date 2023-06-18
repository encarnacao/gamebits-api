import { VotingBody } from "@/protocols";
import voteServices from "@/services/voteServices";
import { users } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

async function createVote(req: Request, res: Response, next: NextFunction) {
  const user: users = res.locals.user;
  const { upVote, reviewId } = req.body as VotingBody;
  try {
    const vote = await voteServices.createVote(reviewId, user.id, upVote);
    res.status(httpStatus.CREATED).send(vote);
  } catch (err) {
    next(err);
  }
}

async function deleteVote(req: Request, res: Response, next: NextFunction) {
  const user: users = res.locals.user;
  const { id } = req.params;
  try {
    await voteServices.deleteVote(Number(id), user.id);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (err) {
    next(err);
  }
}

async function updateVote(req: Request, res: Response, next: NextFunction) {
  const user: users = res.locals.user;
  const { id } = req.params;
  try {
    const update = await voteServices.updateVote(Number(id), user.id);
    res.send(update);
  } catch (err) {
    next(err);
  }
}

export { createVote, deleteVote, updateVote };
