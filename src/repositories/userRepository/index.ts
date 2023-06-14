import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

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

async function findUserById(id: number) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
}

export default { createUser, findUserByEmail, findUserById };
