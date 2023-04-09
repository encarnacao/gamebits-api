import { Router } from "express";
import commentController from "../controllers/commentController.js";
import validateCredentials from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { commentSchema } from "../schemas/commentSchema.js";

const commentRouter = Router();

commentRouter.post(
	"/:id",
	validateCredentials,
	validateSchema(commentSchema),
	commentController.postComment
);
commentRouter.put(
	"/:id",
	validateCredentials,
	validateSchema(commentSchema),
	commentController.editComment
);
commentRouter.delete(
	"/:id",
	validateCredentials,
	commentController.deleteComment
);

export default commentRouter;
