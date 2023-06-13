import errors from "@/errors";
import voteRepository from "@/repositories/voteRepository";

async function checkForVote(reviewId: number, userId: number) {
  const vote = await voteRepository.searchUserVote(reviewId, userId);
  return vote;
}

async function createVote(reviewId: number, userId: number, upVote: boolean) {
  const conflictCheck = await checkForVote(reviewId, userId);
  if (conflictCheck) {
    throw errors.conflictError();
  }
  const vote = await voteRepository.createVote(userId, reviewId, upVote);
  return vote;
}

async function updateVote(reviewId: number, user_id: number) {
  const vote = await checkForVote(reviewId, user_id);
  if (!vote) {
    throw errors.notFoundError();
  }
  const newVote = await voteRepository.updateVote(vote.id, !vote.up_vote);
  return newVote;
}

const voteServices = {
  createVote,
  updateVote,
};

export default voteServices;
