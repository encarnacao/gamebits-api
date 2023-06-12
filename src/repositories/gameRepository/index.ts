import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
import { config } from "@/config/igdb-config";
import axios from "axios";
import { formatSingleGame } from "@/helpers/igdb-format-helper";

async function getGameByIGDBId(igdb_id: number) {
  let search = await prisma.games.findFirst({
    where: {
      igdb_id: parseInt(igdb_id.toString()),
    },
  });
  if (!search) {
    const game = await searchIGDB(igdb_id);
    if (game.original_realease_date !== "Não lançado") {
      search = await createGameEntry(game);
    } else {
      return { ...game, id: -1 };
    }
  }
  return search;
}

async function searchIGDB(igdb_id: number) {
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      `fields name, cover.image_id, first_release_date, platforms.abbreviation, genres.name; where id = ${igdb_id};`,
      config
    );
    const game = formatSingleGame(response.data);
    return game;
  } catch {
    console.log("error");
  }
}

async function createGameEntry(game: Prisma.gamesCreateInput) {
  const gameEntry = await prisma.games.create({
    data: game,
  });
  return gameEntry;
}

export default {
  getGameByIGDBId,
};
