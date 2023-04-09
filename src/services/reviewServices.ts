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

export default { createReview };
