import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDatabase } from "../helpers";
import { prisma } from "@/config";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDatabase();
});

const server = supertest(app);

describe("POST /games", () => {
  it("should return 422 if no query param is sent", async () => {
    const response = await server.post("/games").query({});
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return 422 if query params are invalid", async () => {
    const response = await server.post(
      `/games?${faker.lorem.word()}=${faker.lorem.word()}`
    );
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return 200 if query params are valid", async () => {
    const response = await server.post("/games").query({ name: "mario" });
    expect(response.status).toBe(httpStatus.OK);
  });
});

describe("GET /games/:id", () => {
  it("should return 422 if id is invalid", async () => {
    const response = await server.get("/games/invalid-id");
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  describe("when id is valid", () => {
    it("should not add game to database if unreleased", async () => {
      const response = await server.get("/games/7345");
      const game = await prisma.games.findFirst({ where: { igdb_id: 7345 } });
      expect(game).toBeNull();
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.id).toBe(-1);
    });
    it("should add game to database if released", async () => {
      const response = await server.get("/games/222095");
      const game = await prisma.games.findFirst({ where: { igdb_id: 222095 } });
      expect(game).not.toBeNull();
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body.id).toBe(game.id);
    });
    it("should return 404 if game is not found", async () => {
      const response = await server.get(
        `/games/${faker.datatype.number({ min: 999999 })}`
      );
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
  });
});
