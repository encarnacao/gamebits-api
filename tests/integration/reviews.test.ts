import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDatabase } from "../helpers";
import jwt from "jsonwebtoken";
import { createUser, createReview, createGame } from "../factories";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDatabase();
});

const server = supertest(app);

describe("POST /reviews", () => {
  const generateValidBody = (gameId: number) => ({
    game_id: gameId,
    rating: faker.datatype.number({ min: 0, max: 5, precision: 0.5 }),
    text: faker.lorem.paragraph(),
  });
  it("should return status 401 if no token is provided", async () => {
    const response = await server.post("/reviews");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return status 401 if token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server.post("/reviews").set("Authorization", token);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return status 422 if body is invalid", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const body = { [faker.lorem.word()]: faker.lorem.word() };
      delete body.game_id;
      const response = await server
        .post("/reviews")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return status 404 if game does not exist", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const body = generateValidBody(faker.datatype.number());
      const response = await server
        .post("/reviews")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return status 201 if body is valid", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const game = await createGame();
      const body = generateValidBody(game.id);
      const response = await server
        .post("/reviews")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(response.status).toBe(httpStatus.CREATED);
    });
    it("should return status 409 if user already reviewed the game", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const game = await createGame();
      const body = generateValidBody(game.id);
      await createReview(user.id, game.id);
      const response = await server
        .post("/reviews")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });
  });
});

describe("DELETE /reviews/:id", () => {
  it("should return status 401 if no token is provided", async () => {
    const response = await server.delete("/reviews/1");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return status 401 if token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .delete("/reviews/1")
      .set("Authorization", token);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return status 422 if params is invalid", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete("/reviews/invalid")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return status 404 if review does not exist", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete("/reviews/1")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return status 403 if user is not the review owner", async () => {
      const user = await createUser();
      const otherUser = await createUser();
      const game = await createGame();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const review = await createReview(otherUser.id, game.id);
      const response = await server
        .delete(`/reviews/${review.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });
    it("should return status 204 if user is the review owner", async () => {
      const user = await createUser();
      const game = await createGame();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const review = await createReview(user.id, game.id);
      const response = await server
        .delete(`/reviews/${review.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NO_CONTENT);
    });
  });
});
