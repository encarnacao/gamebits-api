import { Router } from "express";

import validateCredentials from "../middlewares/authMiddleware.js";
import { validateBody, validateParams } from "../middlewares/validateSchema.js";
import { reviewSchema } from "../schemas/reviewSchema.js";
import { createReview, deleteReview } from "@/controllers/reviewController.js";
import { paramsSchema } from "@/schemas/genericSchemas.js";

const reviewsRouter = Router();

reviewsRouter.post(
	"/",
	validateCredentials,
	validateBody(reviewSchema),
	createReview
)
.delete(
	"/:id",
	validateCredentials,
	validateParams(paramsSchema),
	deleteReview
)

export default reviewsRouter;
