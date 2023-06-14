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
  return { message: "Vote deleted successfully" };
}

const voteServices = {
  createVote,
  updateVote,
  deleteVote,
};

export default voteServices;
