import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function addGameToLibrary(
  game_id: number,
  user_id: number,
  wishlist: boolean
) {
  return await prisma.libraries.create({
    data: { game_id, user_id, wishlist },
  });
}

async function removeGameFromLibrary(id: number) {
  return await prisma.libraries.delete({
    where: { id },
  });
}

async function updateLibraryEntry(
  id: number,
  props: Prisma.librariesUpdateInput
) {
  return await prisma.libraries.update({
    where: { id },
    data: { ...props, updated_at: new Date() },
  });
}

async function searchLibraryEntry(user_id: number, game_id: number) {
  return await prisma.libraries.findFirst({
    where: { user_id, game_id },
  });
}

async function searchLibrary(user_id: number, wishlist: boolean) {
  return await prisma.libraries.findMany({
    where: { user_id, wishlist },
    include: { games: true },
  });
}

export default {
  addGameToLibrary,
  removeGameFromLibrary,
  updateLibraryEntry,
  searchLibraryEntry,
  searchLibrary,
};
