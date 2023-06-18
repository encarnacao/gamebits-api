import { config } from "@/config/igdb-config";
import { formatResponse } from "@/helpers";
import gamesRepository from "@/repositories/gameRepository";
import errors from "@/errors";

export async function searchGame(gameName: string) {
  const body = `fields name, cover.image_id, first_release_date, platforms.abbreviation, summary, involved_companies; search "${gameName}";`;
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
    const json = formatResponse(await response.json());
    return json;
  } catch (err) {
    throw errors.notFoundError();
  }
}

export async function getGameByIGDBId(igdb_id: number) {
  try {
    const game = await gamesRepository.getGameByIGDBId(igdb_id);
    return game;
  } catch (err) {
    throw errors.notFoundError();
  }
}

const gamesServices = {
  searchGame,
  getGameByIGDBId,
};

export default gamesServices;
