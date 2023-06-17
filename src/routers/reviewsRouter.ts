import { Router } from "express";

import validateCredentials from "@/middlewares/authMiddleware";
import { validateBody, validateParams } from "@/middlewares";
import { reviewSchema } from "@/schemas";
import {
  createReview,
  deleteReview,
  getGameReviews,
  getUserReviews,
} from "@/controllers/reviewController.js";
import { paramsSchema } from "@/schemas/genericSchemas.js";

const reviewsRouter = Router();

reviewsRouter
  .post("/", validateCredentials, validateBody(reviewSchema), createReview)
  .delete(
    "/:id",
    validateCredentials,
    validateParams(paramsSchema),
    deleteReview
  )
  .get("/:id", validateParams(paramsSchema), getGameReviews)
  .get("/user/:id", validateParams(paramsSchema), getUserReviews);

export default reviewsRouter;
