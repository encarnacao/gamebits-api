import { prisma } from "@/config";

async function followUser(user_id: number, followed_id: number) {
  return await prisma.follows.create({
    data: { followed: followed_id, following: user_id },
  });
}

async function unfollowUser(id: number) {
  return await prisma.follows.delete({
    where: { id },
  });
}

async function searchFollow(user_id: number, followed_id: number) {
  return await prisma.follows.findFirst({
    where: { followed: followed_id, following: user_id },
  });
}

async function getFollowers(user_id: number) {
  return await prisma.follows.findMany({
    where: { followed: user_id },
    include: {
      users_follows_followingTousers: {
        select: { id: true, username: true, image_url: true },
      },
    },
  });
}

async function getFollowings(user_id: number) {
  return await prisma.follows.findMany({
    where: { following: user_id },
    include: {
      users_follows_followedTousers: {
        select: { id: true, username: true, image_url: true },
      },
    },
  });
}

export default {
  followUser,
  unfollowUser,
  searchFollow,
  getFollowers,
  getFollowings,
};
