import { loadEnv } from "./env";

loadEnv();
export const headers = {
  "client-id": process.env.IGDB_CLIENT_ID,
  authorization: `Bearer ${process.env.IGDB_TOKEN}`,
};
