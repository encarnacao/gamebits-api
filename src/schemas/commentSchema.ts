import Joi from "joi";

export const commentSchema = Joi.object<CommentBody>({
	comment: Joi.string().min(1).required(),
});

export type CommentBody = {
	comment: string;
};
