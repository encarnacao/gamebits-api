import errors from "@/errors";
import { ReviewBody } from "@/protocols";
import reviewRepository from "@/repositories/reviewRepository";

async function validateUserReview(reviewId: number, userId: number) {
  const review = await reviewRepository.searchReview(reviewId);
  if (!review) {
    throw errors.notFoundError();
  }
  if (review.user_id !== userId) {
    throw errors.forbiddenError();
  }
  return review;
}

async function validateReview(userId: number, gameId: number) {
  const search = await reviewRepository.searchUserReviews(userId);
  const review = search.find((review) => review.game_id === gameId);
  if (review) {
    throw errors.conflictError();
  }
}

async function createReview(userId: number, body: ReviewBody) {
  await validateReview(userId, body.game_id);
  const review = await reviewRepository.createReview(
    userId,
    body.game_id,
    body.text,
    body.rating
  );
  return review;
}

async function deleteReview(reviewId: number, userId: number) {
  await validateUserReview(reviewId, userId);
  await reviewRepository.deleteReview(reviewId);
  return { message: "Review deleted successfully" };
}

const reviewServices = {
  createReview,
  deleteReview,
};

export default reviewServices;
