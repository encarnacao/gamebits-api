import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function addUser() {
	await prisma.users.create({
		data: {
			name: "User",
			email: "user@email.com",
			picture_url: "https://picsum.photos/500",
			password: await bcrypt.hash("example", 10),
		},
	});
}

async function addGame() {
	await prisma.games.create({
		data: {
			name: "Game",
		},
	});
}

async function addReview() {
	await prisma.reviews.create({
		data: {
			rating: 5.0,
			review: "This is a review",
			games: {
				connect: { id: 1 },
			},
			users: {
				connect: { id: 1 },
			},
		},
	});
}

async function main() {
	const user = await prisma.users.findFirst();
	if (!user) {
		await addUser();
		await addGame();
		await addReview();
		console.log("User, game and review added to database");
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
