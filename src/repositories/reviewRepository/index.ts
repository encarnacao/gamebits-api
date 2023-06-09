import { prisma } from "@/config";

async function createReview(
  user_id: number,
  game_id: number,
  text: string,
  rating: number
) {
  return await prisma.reviews.create({
    data: { user_id, game_id, text, rating },
  });
}

async function deleteReview(id: number) {
  return await prisma.reviews.delete({
    where: { id },
  });
}

async function searchReview(id: number) {
  return await prisma.reviews.findFirst({
    where: { id },
  });
}

async function searchReviews(game_id: number) {
  return await prisma.reviews.findMany({
    where: { game_id },
    include: {
      users: {
        select: { id: true, username: true, image_url: true },
      },
      votes: {
        select: { user_id: true, up_vote: true },
      },
    },
  });
}

async function searchUserReviews(user_id: number) {
  return await prisma.reviews.findMany({
    where: { user_id },
    include: {
      games: true,
      votes: {
        select: { user_id: true, up_vote: true },
      },
    },
  });
}

export default {
  createReview,
  deleteReview,
  searchReview,
  searchReviews,
  searchUserReviews,
};
