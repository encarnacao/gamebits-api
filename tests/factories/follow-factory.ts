import { prisma } from "@/config";

export async function createFollow(followingId: number, followedId: number) {
  return await prisma.follows.create({
    data: {
      followed: followedId,
      following: followingId,
    },
  });
}
