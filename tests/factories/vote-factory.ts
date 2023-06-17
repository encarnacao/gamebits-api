import { prisma } from "@/config";

export async function createVote(userId: number, reviewId: number, upvote: boolean){
  return await prisma.votes.create({
    data: {
      user_id: userId,
      review_id: reviewId,
      up_vote: upvote
    }
  })
}