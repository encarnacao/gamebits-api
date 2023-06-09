import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const user = prisma.users.findFirst({});
	if (!user) {
		const password = await bcrypt.hash("123456", 10);
		const created = await prisma.users.create({
			data: {
				email: "user@email.com",
				password,
				username: "first_user",
			},
		});
		console.log(created);
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
