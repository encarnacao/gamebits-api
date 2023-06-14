import { Router } from "express";
import reviewController from "../controllers/reviewController.js";
import validateCredentials from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateSchema.js";
import { reviewSchema } from "../schemas/reviewSchema.js";

const reviewRouter = Router();

reviewRouter.post(
	"/",
	validateCredentials,
	validateBody(reviewSchema),
	reviewController.createReview
);

reviewRouter.get("/", reviewController.getAll);

export default reviewRouter;
