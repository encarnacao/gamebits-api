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

async function getReviewById(id: number) {
	return await prisma.reviews.findUnique({
		where: { id },
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
				},
			},
		},
	});
}

async function getReviews(queryParams: { game?: string; user?: string }) {
	const { game, user } = queryParams;
	let where: whereParams = {};
	if (game) {
		where = { ...where, games: { name: game } };
	}
	if (user) {
		where = { ...where, users: { name: user } };
	}
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
				},
			},
			comments: {
				select: {
					id: true,
					text: true,
					users: {
						select: {
							id: true,
							name: true,
							picture_url: true,
						},
					},
				},
				orderBy: { created_at: "desc" },
			},
		},
		orderBy: { created_at: "desc" },
		where: where,
	});
}

type whereParams = {
	games?: { name: string };
	users?: { name: string };
};

export default { createReview, getReviews, getReviewById };
