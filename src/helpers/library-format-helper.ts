import { games, libraries } from "@prisma/client";

export function formatLibrary(library: (libraries & { games: games })[]) {
  const formattedLibrary = library.map((entry) => {
    return {
      id: entry.id,
      game: {
        id: entry.games.id,
        igdbId: entry.games.igdb_id,
        name: entry.games.name,
        cover: entry.games.cover_url,
        originalReleaseDate: entry.games.original_release_date,
        genres: entry.games.genres,
        platforms: entry.games.platforms,
      },
      finished: entry.finished,
      wishlist: entry.wishlist,
      platinum: entry.platinum,
      completionTime: entry.completion_time,
      createdAt: entry.created_at,
      updatedAt: entry.updated_at,
    };
  });
  return formattedLibrary;
}
