import { Prisma } from "@prisma/client";

interface igdbResponse {
  id: number;
  cover: {
    image_id: string;
    id: number;
  };
  name: string;
  first_release_date: number;
  platforms: platform[];
  summary: string;
}

interface singleGameResponse {
  id: number;
  cover: {
    image_id: string;
    id: number;
  };
  name: string;
  first_release_date: number;
  platforms: platform[];
  genres: genre[];
}

interface genre {
  name: string;
  id: number;
}

interface platform {
  abbreviation: string;
  id: number;
}

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

export function formatSingleGame(response: singleGameResponse[]): GameEntity {
  const { id, cover, name, first_release_date, platforms, genres } =
    response[0];
  const platformNames =
    platforms?.length > 0
      ? platforms.map((platform) => platform.abbreviation).join(", ")
      : "Não informado";
  const releaseDate = first_release_date
    ? new Date(first_release_date * 1000).toLocaleDateString("pt-BR")
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
    original_realease_date: releaseDate,
    platforms: platformNames,
    genres: genreNames,
  };
}

export type GameEntity = Pick<
  Prisma.gamesCreateInput,
  | "igdb_id"
  | "name"
  | "cover_url"
  | "original_realease_date"
  | "genres"
  | "platforms"
>;
