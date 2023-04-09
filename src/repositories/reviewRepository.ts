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

async function getAllReviews(){
	return await prisma.reviews.findMany({
		select: {
			id: true,
			rating: true,
			review: true,
			users: {
				select: {
					id: true,
					name: true,
					picture_url: true,
				},
				
			},
			games: {
				select: {
					id: true,
					name: true,
				}
			}
		}
	});
}

export default { createReview, getAllReviews };
