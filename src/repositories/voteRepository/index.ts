import { prisma } from "@/config";

async function searchUserVote(review_id: number, user_id: number) {
  return await prisma.votes.findFirst({
    where: { review_id, user_id },
  });
}

async function createVote(
  user_id: number,
  review_id: number,
  up_vote: boolean
) {
  return await prisma.votes.create({
    data: { user_id, review_id, up_vote },
  });
}

async function updateVote(id: number, up_vote: boolean) {
  return await prisma.votes.update({
    where: { id },
    data: { up_vote },
  });
}

async function deleteVote(id: number) {
  return await prisma.votes.delete({
    where: { id },
  });
}

export default {
  searchUserVote,
  createVote,
  updateVote,
  deleteVote,
};
