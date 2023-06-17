import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDatabase, createValidReview } from "../helpers";
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
      const { user, game } = await createValidReview();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const body = generateValidBody(game.id);
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
        .delete(`/reviews/${faker.lorem.word()}`)
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
      const { review } = await createValidReview();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete(`/reviews/${review.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });
    it("should return status 204 if user is the review owner", async () => {
      const { user, review } = await createValidReview();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete(`/reviews/${review.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NO_CONTENT);
    });
  });
});

describe("GET /reviews/:id", () => {
  it("should return status 422 if params is invalid", async () => {
    const response = await server.get(`/reviews/${faker.lorem.word()}`);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return status 404 if there are no reviews for game id", async () => {
    const response = await server.get("/reviews/1");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return status 200 if there are reviews for game id", async () => {
    const { game, user, review } = await createValidReview();
    const response = await server.get(`/reviews/${game.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: review.id,
        rating: Number(review.rating),
        text: review.text,
        reviewWriter: {
          id: user.id,
          username: user.username,
          imageUrl: user.image_url,
        },
        upVotes: [],
        downVotes: [],
        createdAt: review.created_at.toISOString(),
      },
    ]);
  });
});

describe("GET /reviews/user/:id", () => {
  it("should return status 422 if params is invalid", async () => {
    const response = await server.get(`/reviews/user/${faker.lorem.word()}`);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return status 404 if there are no reviews for user id", async () => {
    const response = await server.get("/reviews/user/1");
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return status 200 if there are reviews for user id", async () => {
    const { game, user, review } = await createValidReview();
    const response = await server.get(`/reviews/user/${user.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: review.id,
        rating: Number(review.rating),
        text: review.text,
        game: {
          id: game.id,
          name: game.name,
          coverUrl: game.cover_url,
          originalReleaseDate: game.original_realease_date.toISOString(),
          genres: game.genres,
          platforms: game.platforms,
        },
        upVotes: [],
        downVotes: [],
        createdAt: review.created_at.toISOString(),
      },
    ]);
  });
});
