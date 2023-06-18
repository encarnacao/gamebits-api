import { Prisma, follows, games, reviews, users, votes } from "@prisma/client";

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

export interface VotingBody {
  reviewId: number;
  upVote: boolean;
}

export type GameEntity = Pick<
  Prisma.gamesCreateInput,
  | "igdb_id"
  | "name"
  | "cover_url"
  | "original_release_date"
  | "genres"
  | "platforms"
>;

export type UnformattedReviews = reviews & {
  users: {
    id: number;
    username: string;
    image_url: string;
  };
  votes: {
    user_id: number;
    up_vote: boolean;
  }[];
};

export type UnformattedUserReviews = reviews & {
  games: games;
  votes: {
    user_id: number;
    up_vote: boolean;
  }[];
};

export type UnformattedUser = users & {
  follows_follows_followedTousers: follows[];
  follows_follows_followingTousers: follows[];
};

export type UserParams = Pick<users, "username" | "email" | "password">;

export type SignInBody = Pick<users, "email" | "password">;
