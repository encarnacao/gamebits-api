import { Response, Request, NextFunction } from "express";
import errors from "../errors/index.js";
import { CommentBody } from "../schemas/commentSchema.js";
import commentServices from "../services/commentServices.js";

async function postComment(req: Request, res: Response, next: NextFunction) {
	const { comment } = req.body as CommentBody;
	const userId = Number(res.locals.user.id);
	const reviewId = Number(req.params.id);
	if(!reviewId)
		throw errors.badRequestError("Review id is required");
	try {
		const commentEntry = await commentServices.createComment(
			comment,
			userId,
			reviewId
		);
		res.status(201).send(commentEntry);
	} catch (err) {
		next(err);
	}
}

async function deleteComment(req: Request, res: Response, next: NextFunction) {
	const id = Number(req.params.id);
	const userId = Number(res.locals.user.id);
	try {
		await commentServices.deleteComment(id, userId);
		res.sendStatus(204);
	} catch (err) {
		next(err);
	}
}

async function editComment(req: Request, res: Response, next: NextFunction) {
	const id = Number(req.params.id);
	const userId = Number(res.locals.user.id);
	const { comment } = req.body as CommentBody;
	try {
		const editComment = await commentServices.editComment(
			id,
			userId,
			comment
		);
		res.status(200).send(editComment);
	} catch (err) {
		next(err);
	}
}

export default { postComment, deleteComment, editComment };
