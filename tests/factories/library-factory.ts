import { prisma } from "@/config";

export async function createLibraryEntry(userId: number, gameId: number, wishlist: boolean = false) {
  const libraryEntry = await prisma.libraries.create({
    data: {
      user_id: userId,
      game_id: gameId,
      wishlist,
    },
  });

  return libraryEntry;
}