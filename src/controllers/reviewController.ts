import { Request, Response, NextFunction } from "express";
import { ReviewBody } from "../schemas/reviewSchema.js";
import errors from "../errors/index.js";
import reviewServices from "../services/reviewServices.js";

async function createReview(req: Request, res: Response, next: NextFunction) {
	const body = req.body as ReviewBody;
	const userId = Number(res.locals.user.id);
	try {
		const review = await reviewServices.createReview(body, userId);
		res.status(201).send(review);
	} catch (err) {
		next(err);
	}
}

async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const reviews = await reviewServices.getAll();
		res.status(200).send(reviews);
	} catch (err) {
		next(err);
	}
}

export default { createReview, getAll };
