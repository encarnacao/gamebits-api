import { Request, Response, NextFunction } from "express";
import { ReviewBody } from "@/protocols";
import reviewServices from "@/services/reviewServices";
import { users } from "@prisma/client";
import httpStatus from "http-status";

async function createReview(req: Request, res: Response, next: NextFunction) {
  const body = req.body as ReviewBody;
  const user: users = res.locals.user;
  try {
    const review = await reviewServices.createReview(user.id, body);
    res.status(httpStatus.CREATED).send(review);
  } catch (err) {
    next(err);
  }
}

async function getGameReviews(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const reviews = await reviewServices.getReviews(Number(id));
    res.send(reviews);
  } catch (err) {
    next(err);
  }
}

async function getUserReviews(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const reviews = await reviewServices.getUserReviews(Number(id));
    res.send(reviews);
  } catch (err) {
    next(err);
  }
}

async function deleteReview(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const user: users = res.locals.user;
  try {
    await reviewServices.deleteReview(Number(id), user.id);
    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (err) {
    next(err);
  }
}

export { createReview, getGameReviews, getUserReviews, deleteReview };
