import { Prisma, reviews, users } from "@prisma/client";

export interface igdbResponse {
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

export interface singleGameResponse {
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

export interface idParams {
  id: number;
}

export interface searchQuery {
  name: string;
}

export interface ErrorType {
  status: number;
  name: string;
  message: string;
  email?: string;
}

export interface Session {
  email: string;
  iat: number;
}

export interface LibraryUpdate {
  status: string;
  completion_time?: number;
}

export interface ReviewBody {
  game_id: number;
  text: string;
  rating: number;
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

export type UserParams = Pick<users, "username" | "email" | "password">;

export type SignInBody = Pick<users, "email" | "password">;
