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

async function updateVote(id: number, user_id: number, upVote: boolean) {
  const voteCheck = await checkForVote
  const vote = await voteRepository.updateVote(id, upVote);
  return vote;
}

const voteServices = {
  createVote,
};

export default voteServices;
