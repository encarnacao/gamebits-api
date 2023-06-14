import { Router } from "express";

import validateCredentials from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateSchema.js";
import { reviewSchema } from "../schemas/reviewSchema.js";
import { createReview } from "@/controllers/reviewController.js";

const reviewsRouter = Router();

reviewsRouter.post(
	"/",
	validateCredentials,
	validateBody(reviewSchema),
	createReview
);

export default reviewsRouter;
