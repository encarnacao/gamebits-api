import errors from "@/errors";
import gameRepository from "@/repositories/gameRepository";
import libraryRepository from "@/repositories/libraryRepository";

async function validateGame(gameId: number) {
  const game = await gameRepository.searchById(gameId);
  if (!game) {
    throw errors.notFoundError();
  }
}

async function validateLibraryEntry(userId: number, gameId: number) {
  const library = await libraryRepository.searchLibraryEntry(userId, gameId);
  if (!library) {
    throw errors.notFoundError();
  }
  return library;
}

export async function addGameToLibrary(
  userId: number,
  gameId: number,
  isWishlist: boolean
) {
  validateGame(gameId);
  const library = await libraryRepository.addGameToLibrary(
    userId,
    gameId,
    isWishlist
  );
  return library;
}

export async function removeFromLibrary(userId: number, libraryId: number) {
  const library = await validateLibraryEntry(userId, libraryId);
  await libraryRepository.removeGameFromLibrary(library.id);
}

const libraryServices = {
  addGameToLibrary,
};

export default libraryServices;
