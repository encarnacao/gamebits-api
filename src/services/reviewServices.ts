import { Decimal } from "@prisma/client/runtime/index.js";
import gameRepository from "../repositories/gameRepository.js";
import reviewRepository from "../repositories/reviewRepository.js";
import { ReviewBody } from "../schemas/reviewSchema.js";

function formatReviewOutput(review: reviewsEntity[]) {
	const output = review.map((element) => {
		const comments = element.comments.map((comment) => ({
			id: comment.id,
			username_id: comment.users.id,
			username: comment.users.name,
			picture_url: comment.users.picture_url,
			comment_text: comment.text,
		}));
		return {
			id: element.id,
			username_id: element.users.id,
			username: element.users.name,
			picture_url: element.users.picture_url,
			game: element.games.name,
			rating: element.rating,
			review_text: element.review,
			comments,
		};
	});
	return output;
}

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
	const reviews = formatReviewOutput(reviewsEntity);
	return reviews;
}

type reviewsEntity = {
	rating: Decimal;
	review: string;
	games: {
		id: number;
		name: string;
	};
	id: number;
	comments: {
		id: number;
		users: {
			id: number;
			name: string;
			picture_url: string;
		};
		text: string;
	}[];
	users: {
		id: number;
		name: string;
		picture_url: string;
	};
};

export default { createReview, getAll };
