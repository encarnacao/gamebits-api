import {
  GameEntity,
  GameResponse,
  igdbResponse,
  singleGameResponse,
} from "@/protocols";
import { games } from "@prisma/client";

export function formatResponse(response: igdbResponse[]) {
  return response.map((game) => {
    const { id, cover, name, first_release_date, platforms, summary } = game;
    const platformNames =
      platforms?.length > 0
        ? platforms.map((platform) => platform.abbreviation).join(", ")
        : "Não informado";
    const releaseDate = new Date(first_release_date * 1000).toLocaleDateString(
      "pt-BR"
    );
    const coverUrl = cover
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`
      : "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif";
    return {
      id,
      coverUrl,
      name,
      releaseDate,
      platformNames,
      summary,
    };
  });
}

export function formatGameEntry(response: singleGameResponse[]): GameEntity {
  const { id, cover, name, first_release_date, platforms, genres } =
    response[0];
  const platformNames =
    platforms?.length > 0
      ? platforms.map((platform) => platform.abbreviation).join(", ")
      : "Não informado";
  const releaseDate = first_release_date
    ? new Date(first_release_date * 1000)
    : "Não lançado";
  const coverUrl = cover
    ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`
    : "https://blog.springshare.com/wp-content/uploads/2010/02/nc-md.gif";
  const genreNames = genres
    ? genres.map((genre) => genre.name).join(", ")
    : "Não informado";
  return {
    igdb_id: id,
    cover_url: coverUrl,
    name,
    original_release_date: releaseDate,
    platforms: platformNames,
    genres: genreNames,
  };
}

export function formatGameResponse(response: games): GameResponse {
  return {
    id: response.id,
    igdbId: response.igdb_id,
    coverUrl: response.cover_url,
    name: response.name,
    originalReleaseDate: response.original_release_date,
    platforms: response.platforms,
    genres: response.genres,
    createdAt: response.created_at,
    updatedAt: response.updated_at,
  };
}
