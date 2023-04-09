import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function findOrCreateGame(name: string) {
	return (
		(await prisma.games.findUnique({
			where: {
				name,
			},
			select: {
				id: true,
			},
		})) ||
		(await prisma.games.create({
			data: {
				name,
			},
			select: {
				id: true,
			},
		}))
	);
}

export default { findOrCreateGame };
