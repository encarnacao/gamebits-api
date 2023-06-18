import { prisma } from "@/config";

export async function createLibraryEntry(
  userId: number,
  gameId: number,
  wishlist: boolean = false,
  finished: boolean = false,
  platinum: boolean = false
) {
  const libraryEntry = await prisma.libraries.create({
    data: {
      user_id: userId,
      game_id: gameId,
      wishlist,
      finished,
      platinum,
    },
  });

  return libraryEntry;
}
