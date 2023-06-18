import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function createGame(){
  return await prisma.games.create({
    data: {
      igdb_id: faker.datatype.number(),
      name: faker.lorem.words(3),
      cover_url: faker.image.imageUrl(),
      platforms: faker.lorem.words(3),
      genres: faker.lorem.words(3),
      original_release_date: faker.date.past(),
    }
  })
}