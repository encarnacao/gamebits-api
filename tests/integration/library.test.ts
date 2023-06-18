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

describe("POST /libraries/wishlist/:id", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await server.post(
      `/libraries/wishlist/${faker.datatype.number()}`
    );
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return 401 if token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .post(`/libraries/wishlist/${faker.datatype.number()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return 422 if id is not a number", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/libraries/wishlist/${faker.lorem.word()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 404 if game does not exist", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/libraries/wishlist/${faker.datatype.number()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return 409 if game is already in library", async () => {
      const user = await createUser();
      const game = await createGame();
      await createLibraryEntry(user.id, game.id, true);
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/libraries/wishlist/${game.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });
    it("should return 201 if game is added to library", async () => {
      const user = await createUser();
      const game = await createGame();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/libraries/wishlist/${game.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        user_id: user.id,
        game_id: game.id,
        wishlist: true,
        finished: false,
        platinum: false,
        completion_time: null,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });
});

describe("DELETE /libraries/:id", () => {
  it("should return 401 if no token is provided", async () => {
    const response = await server.delete(
      `/libraries/${faker.datatype.number()}`
    );
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return 401 if token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .delete(`/libraries/${faker.datatype.number()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return 422 if id is not a number", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete(`/libraries/${faker.lorem.word()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 404 if game does not exist in library", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete(`/libraries/${faker.datatype.number()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return 204 if game is deleted from library", async () => {
      const { user, game } = await createValidLibrary();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete(`/libraries/${game.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NO_CONTENT);
    });
  });
});

describe("PUT /libraries/:id", () => {
  const generateValidBody = (status: string, completion_time?: number) => ({
    status,
    completion_time,
  });
  it("should return 401 if no token is provided", async () => {
    const response = await server.put(`/libraries/${faker.datatype.number()}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return 401 if token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .put(`/libraries/${faker.datatype.number()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return 422 if id is not a number", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${faker.lorem.word()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 422 if body is empty", async () => {
      const { user, game } = await createValidLibrary();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${game.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 422 if body is invalid", async () => {
      const { user, game } = await createValidLibrary();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${game.id}`)
        .send({ status: faker.lorem.word() })
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 404 if game does not exist in library", async () => {
      const user = await createUser();
      const body = generateValidBody("finished");
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${faker.datatype.number()}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return 400 if game is wishlist", async () => {
      const { user, game } = await createValidLibrary(true);
      const body = generateValidBody(
        faker.helpers.arrayElement(["platinum", "finished", "completion_time"])
      );
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${game.id}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("should return 400 if game is not finished and status is platinum", async () => {
      const { user, game } = await createValidLibrary();
      const body = generateValidBody("platinum");
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${game.id}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("should return 400 if game is not finished and status is completion_time", async () => {
      const { user, game } = await createValidLibrary();
      const body = generateValidBody("completion_time", 10);
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${game.id}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("should return 422 if status is completion_time and completion_time is not provided", async () => {
      const { user, game } = await createValidLibrary(false, true);
      const body = generateValidBody("completion_time");
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${game.id}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 200 if status is completion_time, game is finished and completion_time is provides", async () => {
      const { user, library } = await createValidLibrary(false, true);
      const body = generateValidBody(
        "completion_time",
        faker.datatype.number({ min: 1, max: 999, precision: 0.1 })
      );
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${library.game_id}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: library.id,
        user_id: library.user_id,
        game_id: library.game_id,
        finished: library.finished,
        platinum: library.platinum,
        wishlist: library.wishlist,
        completion_time: body.completion_time.toString(),
        created_at: library.created_at.toISOString(),
        updated_at: expect.any(String),
      });
    });
    it("should return 200 updating status finished", async () => {
      const { user, library } = await createValidLibrary(
        false,
        faker.datatype.boolean()
      );
      const body = generateValidBody("finished");
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${library.game_id}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: library.id,
        user_id: library.user_id,
        game_id: library.game_id,
        finished: !library.finished,
        platinum: library.platinum,
        wishlist: library.wishlist,
        completion_time: library.completion_time,
        created_at: library.created_at.toISOString(),
        updated_at: expect.any(String),
      });
    });
    it("should return 200 updating status platinum", async () => {
      const { user, library } = await createValidLibrary(
        false,
        true,
        faker.datatype.boolean()
      );
      const body = generateValidBody("platinum");
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/libraries/${library.game_id}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: library.id,
        user_id: library.user_id,
        game_id: library.game_id,
        finished: library.finished,
        platinum: !library.platinum,
        wishlist: library.wishlist,
        completion_time: library.completion_time,
        created_at: library.created_at.toISOString(),
        updated_at: expect.any(String),
      });
    });
  });
});

describe("GET /libraries/:id", () => {
  it("should return 404 if user does not exist", async () => {
    const response = await server.get(`/libraries/${faker.datatype.number()}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return 404 if user does not have any game in library", async () => {
    const user = await createUser();
    const response = await server.get(`/libraries/${user.id}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return 200 and list of games in library", async () => {
    const { user, game, library } = await createValidLibrary();
    const response = await server.get(`/libraries/${user.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: library.id,
        game: {
          id: game.id,
          name: game.name,
          cover: game.cover_url,
          originalReleaseDate: game.original_release_date.toISOString(),
          genres: game.genres,
          platforms: game.platforms,
        },
        finished: library.finished,
        platinum: library.platinum,
        wishlist: library.wishlist,
        completion_time: library.completion_time,
        created_at: library.created_at.toISOString(),
        updated_at: library.updated_at.toISOString(),
      },
    ]);
  });
});

describe("GET /libraries/wishlist/:id", () => {
  it("should return 404 if user does not exist", async () => {
    const response = await server.get(
      `/libraries/wishlist/${faker.datatype.number()}`
    );
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return 404 if user does not have any game in wishlist", async () => {
    const user = await createUser();
    const response = await server.get(`/libraries/wishlist/${user.id}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return 200 and list of games in wishlist", async () => {
    const { user, game, library } = await createValidLibrary(true);
    const response = await server.get(`/libraries/wishlist/${user.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: library.id,
        game: {
          id: game.id,
          name: game.name,
          cover: game.cover_url,
          originalReleaseDate: game.original_release_date.toISOString(),
          genres: game.genres,
          platforms: game.platforms,
        },
        finished: library.finished,
        platinum: library.platinum,
        wishlist: library.wishlist,
        completion_time: library.completion_time,
        created_at: library.created_at.toISOString(),
        updated_at: library.updated_at.toISOString(),
      },
    ]);
  });
});
