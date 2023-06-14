import { Request, Response, NextFunction } from "express";
import { ReviewBody, idParams } from "@/protocols";
import reviewServices from "@/services/reviewServices";
import { users } from "@prisma/client";

async function createReview(req: Request, res: Response, next: NextFunction) {
  const body = req.body as ReviewBody;
  const user: users = res.locals.user;
  try {
    const review = await reviewServices.createReview(user.id, body);
    res.status(201).send(review);
  } catch (err) {
    next(err);
  }
}

async function getGameReview(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params as unknown as idParams;
  try {
    const reviews = await reviewServices.getReviews(Number(id));
    res.send(reviews);
  } catch (err) {
    next(err);
  }
}

async function gerUserReviews(req: Request, res: Response, next: NextFunction) {
  const user: users = res.locals.user;
  try {
    const reviews = await reviewServices.getUserReviews(user.id);
    res.send(reviews);
  } catch (err) {
    next(err);
  }
}

async function deleteReview(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params as unknown as idParams;
  const user: users = res.locals.user;
  try {
    await reviewServices.deleteReview(Number(id), user.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

export default { createReview, getGameReview, gerUserReviews, deleteReview };
