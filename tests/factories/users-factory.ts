import { prisma } from "@/config";
import { users } from "@prisma/client";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export async function createUser(params: Partial<users> = {}) {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);
  return await prisma.users.create({
    data: {
      email: params.email || faker.internet.email(),
      username: params.username || faker.internet.userName(),
      password: hashedPassword,
    },
  });
}
