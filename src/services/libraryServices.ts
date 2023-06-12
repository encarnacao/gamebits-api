import errors from "@/errors";
import gameRepository from "@/repositories/gameRepository";
import libraryRepository from "@/repositories/libraryRepository";
import { users } from "@prisma/client";

async function validateGame(gameId: number) {
  const game = await gameRepository.searchById(gameId);
  if (!game) {
    throw errors.notFoundError();
  }
}

export async function addGameToLibrary(
  user: users,
  gameId: number,
  isWishlist: boolean
) {
  validateGame(gameId);
  const library = await libraryRepository.addGameToLibrary(
    user.id,
    gameId,
    isWishlist
  );
  return library;
}

const libraryServices = {
  addGameToLibrary,
};

export default libraryServices;
