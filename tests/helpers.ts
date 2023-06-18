import { prisma } from "@/config";
import {
  createGame,
  createLibraryEntry,
  createReview,
  createUser,
} from "./factories";

export async function cleanDatabase() {
  await prisma.follows.deleteMany({});
  await prisma.libraries.deleteMany({});
  await prisma.games.deleteMany({});
  await prisma.votes.deleteMany({});
  await prisma.reviews.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function createValidReview() {
  const user = await createUser();
  const game = await createGame();
  const review = await createReview(user.id, game.id);
  return { user, game, review };
}

export async function createValidLibrary(wishlist: boolean = false) {
  const user = await createUser();
  const game = await createGame();
  const library = await createLibraryEntry(user.id, game.id, wishlist);
  return { user, game, library };
}
