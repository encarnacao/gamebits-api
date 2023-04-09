import { PrismaClient, type Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function createUser(user: Prisma.usersCreateInput) {
	return await prisma.users.create({
		data: user,
	});
}

async function findUserByEmail(email: string) {
	return await prisma.users.findUnique({
		where: {
			email,
		},
	});
}

export default { createUser, findUserByEmail };
