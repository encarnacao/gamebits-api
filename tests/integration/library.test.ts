import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDatabase, createValidLibrary } from "../helpers";
import jwt from "jsonwebtoken";
import { createGame, createLibraryEntry, createUser } from "../factories";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDatabase();
});

const server = supertest(app);

describe("POST /libraries/add/:id", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await server.post(
      `/libraries/add/${faker.datatype.number()}`
    );
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return 401 if token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .post(`/libraries/add/${faker.datatype.number()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return 422 if id is not a number", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/libraries/add/${faker.lorem.word()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 404 if game does not exist", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/libraries/add/${faker.datatype.number()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return 409 if game is already in library", async () => {
      const user = await createUser();
      const game = await createGame();
      await createLibraryEntry(user.id, game.id);
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/libraries/add/${game.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });
    it("should return 201 if game is added to library", async () => {
      const user = await createUser();
      const game = await createGame();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/libraries/add/${game.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        user_id: user.id,
        game_id: game.id,
        wishlist: false,
        finished: false,
        platinum: false,
        completion_time: null,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });
});
