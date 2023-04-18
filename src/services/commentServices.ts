import errors from "@/errors";
import commentRepository from "@/repositories/commentRepository";
import reviewRepository from "@/repositories/reviewRepository";

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
	const review = await reviewRepository.getReviewById(reviewId);
	if (!review) throw errors.notFoundError();
	const commentEntry = await commentRepository.postComment(
		reviewId,
		userId,
		comment
	);
	return commentEntry;
}

async function deleteComment(id: number, userId: number) {
	await validateUser(id, userId);
	await commentRepository.deleteComment(id);
}

async function editComment(id: number, userId: number, newComment: string) {
	await validateUser(id, userId);
	const editComment = await commentRepository.editComment(id, newComment);
	return editComment;
}

export default { createComment, deleteComment, editComment };
