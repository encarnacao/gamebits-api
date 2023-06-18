import errors from "@/errors";
import reviewRepository from "@/repositories/reviewRepository";
import voteRepository from "@/repositories/voteRepository";

async function checkForVote(reviewId: number, userId: number) {
  const vote = await voteRepository.searchUserVote(reviewId, userId);
  return vote;
}

async function checkForReview(reviewId: number) {
  const review = await reviewRepository.searchReview(reviewId);
  if(!review) {
    throw errors.notFoundError("Review not found");
  }
}

async function createVote(reviewId: number, userId: number, upVote: boolean) {
  await checkForReview(reviewId);
  const conflictCheck = await checkForVote(reviewId, userId);
  if (conflictCheck) {
    throw errors.conflictError();
  }
  const vote = await voteRepository.createVote(userId, reviewId, upVote);
  return vote;
}

async function updateVote(reviewId: number, userId: number) {
  const vote = await checkForVote(reviewId, userId);
  if (!vote) {
    throw errors.notFoundError();
  }
  const newVote = await voteRepository.updateVote(vote.id, !vote.up_vote);
  return newVote;
}

async function deleteVote(reviewId: number, userId: number) {
  const vote = await checkForVote(reviewId, userId);
  if (!vote) {
    throw errors.notFoundError();
  }
  await voteRepository.deleteVote(vote.id);
}

const voteServices = {
  createVote,
  updateVote,
  deleteVote,
};

export default voteServices;
