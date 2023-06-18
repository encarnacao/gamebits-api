import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function createReview(
  userId: number,
  gameId: number,
  rating?: number,
  text?: string
) {
  return await prisma.reviews.create({
    data: {
      rating: rating || faker.datatype.number({ min: 1, max: 5 }),
      user_id: userId,
      game_id: gameId,
      text: text || faker.lorem.paragraph(),
    },
  });
}
