import axios from "axios";
import { config } from "@/config/igdb-config";
import { formatResponse } from "@/helpers/igdb-format-helper";
import gamesRepository from "@/repositories/gameRepository";
import errors from "@/errors";

export async function searchGame(gameName: string) {
  const body = `fields name, cover.image_id, first_release_date, platforms.abbreviation, summary, involved_companies; search "${gameName}";`;
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      body,
      config
    );
    const json = formatResponse(response.data);
    return json;
  } catch (err) {
    console.log(err);
    throw errors.notFoundError();
  }
}

export async function getGameById(igdb_id: number){
  try{
    const game = await gamesRepository.getGameById(igdb_id);
    return game;
  } catch(err){
    console.log(err);
    throw errors.notFoundError();
  }
}

const gamesSerivices = {
  searchGame,
  getGameById
};

export default gamesSerivices;