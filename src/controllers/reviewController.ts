import { Request, Response, NextFunction } from "express";
import { ReviewBody } from "@/protocols";

async function createReview(req: Request, res: Response, next: NextFunction) {
	const body = req.body as ReviewBody;
	const userId = Number(res.locals.user.id);
	try {
	} catch (err) {
		next(err);
	}
}

async function getAll(req: Request, res: Response, next: NextFunction) {
	const queryParams = req.query;
	try {

	} catch (err) {
		next(err);
	}
}

export default { createReview, getAll };
