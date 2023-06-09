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
    const releaseDate = new Date(first_release_date*1000).toLocaleDateString(
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
