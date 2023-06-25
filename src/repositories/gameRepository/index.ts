import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
import { config } from "@/config/igdb-config";
import { formatSingleGame } from "@/helpers/igdb-format-helper";
import errors from "@/errors";
import { GameResponse } from "@/protocols";

async function getGameByIGDBId(igdb_id: number) {
  let search = await prisma.games.findFirst({
    where: {
      igdb_id,
    },
  });
  if (!search) {
    const game = await searchIGDB(igdb_id);
    if (game.originalReleaseDate !== "Não lançado") {
      search = await createGameEntry(game);
    } else {
      return { ...game, id: -1 };
    }
  }
  return search;
}

async function searchIGDB(igdb_id: number) {
  const body = `fields name, cover.image_id, first_release_date, platforms.abbreviation, genres.name; where id = ${igdb_id};`;
  try {
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
        "Client-ID": config.headers["client-id"],
        Authorization: config.headers.authorization,
      },
      body,
    });
    const responseBody = await response.json();
    if (responseBody.length === 0) throw errors.notFoundError();
    const game = formatSingleGame(responseBody);
    return game;
  } catch {
    throw errors.notFoundError();
  }
}

async function searchById(id: number) {
  const game = await prisma.games.findUnique({
    where: { id },
  });
  return game;
}

async function createGameEntry(game: GameResponse) {
  const gameEntry = await prisma.games.create({
    data: {
      igdb_id: game.igdbId,
      cover_url: game.coverUrl,
      name: game.name,
      original_release_date: game.originalReleaseDate,
      platforms: game.platforms,
      genres: game.genres,
    },
  });
  return gameEntry;
}

export default {
  getGameByIGDBId,
  searchById,
};
