import { loadEnv } from "./env";

loadEnv();
export const config = {
  headers: {
    "client-id": process.env.IGDB_CLIENT_ID,
    authorization: `Bearer ${process.env.IGDB_TOKEN}`,
  },
};
