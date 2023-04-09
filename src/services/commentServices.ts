import commentRepository from "../repositories/commentRepository.js";
import errors from "../errors/index.js";

async function validateUser(id: number, userId: number) {
	const commentEntry = await commentRepository.getCommentById(id);
	if (!commentEntry) throw errors.notFoundError();
	if (commentEntry.users.id !== userId) {
		throw errors.forbiddenError();
	}
}

async function createComment(
	comment: string,
	userId: number,
	reviewId: number
) {
	const commentEntry = await commentRepository.postComment(
		reviewId,
		userId,
		comment
	);
	return commentEntry;
}

async function deleteComment(id: number, userId: number) {
	validateUser(id, userId);
	await commentRepository.deleteComment(id);
}

async function editComment(id: number, userId: number, newComment: string) {
	validateUser(id, userId);
	const editComment = await commentRepository.editComment(id, newComment);
	return editComment;
}

export default { createComment, deleteComment, editComment };
