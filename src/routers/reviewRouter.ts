import { Router } from "express";
import reviewController from "../controllers/reviewController.js";
import validateCredentials from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { reviewSchema } from "../schemas/reviewSchema.js";

const reviewRouter = Router();

reviewRouter.post(
	"/",
	validateCredentials,
	validateSchema(reviewSchema),
	reviewController.createReview
);

reviewRouter.get("/", reviewController.getAll);

export default reviewRouter;
