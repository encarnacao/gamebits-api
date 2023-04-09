import gameRepository from "../repositories/gameRepository.js";
import reviewRepository from "../repositories/reviewRepository.js";
import { ReviewBody } from "../schemas/reviewSchema.js";

async function createReview(body: ReviewBody, userId: number) {
	const { game, rating, review } = body;
	const { id: gameId } = await gameRepository.findOrCreateGame(game);
	const reviewEntry = await reviewRepository.createReview(
		gameId,
		userId,
		rating,
		review
	);
	return reviewEntry;
}

async function getAll() {
	const reviewsEntity = await reviewRepository.getAllReviews();
	const reviews = reviewsEntity.map((review) => {
		const comments = review.comments.map((comment) => ({
			id: comment.id,
			username_id: comment.users.id,
			username: comment.users.name,
			picture_url: comment.users.picture_url,
			comment_text: comment.text,
		}));
		return {
			id: review.id,
			username_id: review.users.id,
			username: review.users.name,
			picture_url: review.users.picture_url,
			game: review.games.name,
			rating: review.rating,
			review_text: review.review,
			comments,
		};
	});
	return reviews;
}

export default { createReview, getAll };
