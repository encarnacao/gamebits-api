import { games, libraries } from "@prisma/client";

export function formatLibrary(library: (libraries & { games: games })[]) {
  const formattedLibrary = library.map((entry) => {
    return {
      id: entry.id,
      game: {
        id: entry.games.id,
        igdb_id: entry.games.igdb_id,
        name: entry.games.name,
        cover: entry.games.cover_url,
        originalReleaseDate: entry.games.original_release_date,
        genres: entry.games.genres,
        platforms: entry.games.platforms,
      },
      finished: entry.finished,
      wishlist: entry.wishlist,
      platinum: entry.platinum,
      completion_time: entry.completion_time,
      created_at: entry.created_at,
      updated_at: entry.updated_at,
    };
  });
  return formattedLibrary;
}
