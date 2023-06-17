import { prisma } from "@/config";

export async function cleanDatabase() {
  await prisma.follows.deleteMany({});
  await prisma.libraries.deleteMany({});
  await prisma.games.deleteMany({});
  await prisma.votes.deleteMany({});
  await prisma.reviews.deleteMany({});
  await prisma.users.deleteMany({});
}
