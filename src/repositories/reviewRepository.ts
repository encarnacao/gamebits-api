import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createReview(
	gameId: number,
	userId: number,
	rating: number,
	reviewText: string
) {
	return await prisma.reviews.create({
		data: {
			rating,
			review: reviewText,
			games: {
				connect: { id: gameId },
			},
			users: {
				connect: { id: userId },
			},
		},
	});
}

export default { createReview };
