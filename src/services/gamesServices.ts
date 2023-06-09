import axios from "axios";
import { headers } from "@/config/igdb-config";
import { formatResponse } from "@/helpers/igdb-format-helper";
import errors from "@/errors";

export async function searchGame(gameName: string) {
  const config = {
    headers,
  };
  const body = `fields name, cover.image_id, first_release_date, platforms.abbreviation, summary; search "${gameName}";`;
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

const gamesSerivices = {
  searchGame,
};

export default gamesSerivices;