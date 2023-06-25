import { GameResponse, igdbResponse, singleGameResponse } from "@/protocols";

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

export function formatSingleGame(response: singleGameResponse[]): GameResponse {
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
    igdbId: id,
    coverUrl: coverUrl,
    name,
    originalReleaseDate: releaseDate,
    platforms: platformNames,
    genres: genreNames,
  };
}
