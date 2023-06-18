import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function createUser(user: Prisma.usersCreateInput) {
  return await prisma.users.create({
    data: user,
  });
}

async function findUser(email: string, username?: string) {
  return await prisma.users.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });
}

async function findUserById(id: number) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      follows_follows_followedTousers: true,
      follows_follows_followingTousers: true,
    },
  });
}

export default {
  createUser,
  findUser,
  findUserById,
};
