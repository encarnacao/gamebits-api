import errors from "@/errors";
import { LibraryUpdate } from "@/protocols";
import gameRepository from "@/repositories/gameRepository";
import libraryRepository from "@/repositories/libraryRepository";
import { Prisma, libraries } from "@prisma/client";

async function validateLibraryEntry(userId: number, gameId: number) {
  const library = await libraryRepository.searchLibraryEntry(userId, gameId);
  if (!library) {
    throw errors.notFoundError();
  }
  return library;
}

async function validateNewEntry(userId: number, gameId: number) {
  const game = await gameRepository.searchById(gameId);
  if (!game) throw errors.notFoundError();
  const checkConflict = await libraryRepository.searchLibraryEntry(
    userId,
    gameId
  );
  if (checkConflict) throw errors.conflictError();
}

async function validateUpdate(entry: libraries, body: LibraryUpdate) {
  const updateInput: Prisma.librariesUpdateInput = {};
  if (entry.wishlist) {
    throw errors.badRequestError(
      "You can't update a game that is in your wishlist"
    );
  }
  if (body.status === "platinum" && !entry.finished) {
    throw errors.badRequestError(
      "You can't have platinum trophy of a game you haven't finished"
    );
  }
  if (body.status === "completion_time") {
    if (!entry.finished) {
      throw errors.badRequestError(
        "You can't have a completion time of a game you haven't finished"
      );
    }
    if (!body.completion_time) {
      throw errors.unprocessableEntityError([
        "You must provide a completion time",
      ]);
    }
    updateInput.completion_time = body.completion_time;
  } else {
    updateInput[body.status as keyof Prisma.librariesUpdateInput] =
      !entry[body.status as keyof libraries];
  }
  return updateInput;
}

export async function addGameToLibrary(
  userId: number,
  gameId: number,
  isWishlist: boolean
) {
  await validateNewEntry(userId, gameId);
  const library = await libraryRepository.addGameToLibrary(
    gameId,
    userId,
    isWishlist
  );
  return library;
}

export async function searchLibrary(userId: number, isWishlist: boolean) {
  const library = await libraryRepository.searchLibrary(userId, isWishlist);
  if (library.length === 0) throw errors.notFoundError();
  return library;
}

export async function removeFromLibrary(userId: number, gameId: number) {
  const library = await validateLibraryEntry(userId, gameId);
  await libraryRepository.removeGameFromLibrary(library.id);
}

export async function updateEntry(
  userId: number,
  gameId: number,
  body: LibraryUpdate
) {
  const library = await validateLibraryEntry(userId, gameId);
  const updateInput = await validateUpdate(library, body);
  const newEntry = await libraryRepository.updateLibraryEntry(
    library.id,
    updateInput
  );
  return newEntry;
}

const libraryServices = {
  addGameToLibrary,
  removeFromLibrary,
  updateEntry,
};

export default libraryServices;
