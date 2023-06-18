import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDatabase } from "../helpers";
import { createManyUsers, createUser } from "../factories/";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDatabase();
});

const server = supertest(app);

describe("POST /users/signup", () => {
  const generateValidBody = () => ({
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  it("should return 201 when signup is successful", async () => {
    const body = generateValidBody();
    const response = await server.post("/users/signup").send(body);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual({
      id: expect.any(Number),
      username: body.username,
      email: body.email,
      image_url: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });
  it("should return 409 when email is already in use", async () => {
    const body = generateValidBody();
    await createUser({ email: body.email });
    const response = await server.post("/users/signup").send(body);
    expect(response.status).toBe(httpStatus.CONFLICT);
  });
  it("should return 409 when username is already in use", async () => {
    const username = faker.name.firstName();
    await createUser({ username });
    const response = await server.post("/users/signup").send({
      username,
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    expect(response.status).toBe(httpStatus.CONFLICT);
  });
  it("should return 422 when email is invalid", async () => {
    const body = generateValidBody();
    body.email = "invalid-email";
    const response = await server.post("/users/signup").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return 422 when password is invalid", async () => {
    const body = generateValidBody();
    body.password = "123";
    const response = await server.post("/users/signup").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return 422 when username is invalid", async () => {
    const body = generateValidBody();
    body.username = "       ";
    const response = await server.post("/users/signup").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
});

describe("POST /users/signin", () => {
  const generateValidBody = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
  it("should return 422 if email is invalid", async () => {
    const body = generateValidBody();
    body.email = "invalid-email";
    const response = await server.post("/users/signin").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return 422 if password is missing", async () => {
    const body = generateValidBody();
    delete body.password;
    const response = await server.post("/users/signin").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return 422 if email is missing", async () => {
    const body = generateValidBody();
    delete body.email;
    const response = await server.post("/users/signin").send(body);
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  describe("when body is valid", () => {
    it("should return 401 if not registered", async () => {
      const body = generateValidBody();
      const response = await server.post("/users/signin").send(body);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("should return 401 if password is wrong", async () => {
      const body = generateValidBody();
      await createUser({ email: body.email, password: faker.lorem.word() });
      const response = await server.post("/users/signin").send(body);
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    it("should return 200 if password is correct", async () => {
      const body = generateValidBody();
      const user = await createUser({
        email: body.email,
        password: body.password,
      });
      const response = await server.post("/users/signin").send(body);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        token: expect.any(String),
      });
    });
  });
});

describe("GET /users/:id", () => {
  it("should return 404 if user is not found", async () => {
    const response = await server.get(`/users/${faker.datatype.number()}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return 422 if id is invalid", async () => {
    const response = await server.get("/users/invalid-id");
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return 200 if user is found", async () => {
    const user = await createUser();
    const response = await server.get(`/users/${user.id}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: user.id,
      username: user.username,
      imageUrl: user.image_url,
      followers: 0,
      following: 0,
    });
  });
});

describe("GET /users/all", () => {
  it("should return 200 and empty array if no users are found", async () => {
    const response = await server.get("/users/all");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
  it("should return 200 and array of users if users are found", async () => {
    const users = await createManyUsers(5);
    const response = await server.get("/users/");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      users.map((user) => ({
        id: user.id,
        username: user.username,
        imageUrl: user.image_url,
        followers: 0,
        following: 0,
      }))
    );
  });
});

describe("GET /users/?username=", () => {
  it("should return 200 and empty array if no users are found", async () => {
    const response = await server.get("/users/?username=invalid-username");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
  it("should return 200 and array of users if users are found", async () => {
    const firstUser = await createUser({ username: "first-user" });
    const secondUser = await createUser({ username: "second-user" });
    const thirdUser = await createUser({ username: "unrelated" });
    const response = await server.get("/users/?username=user");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      [firstUser, secondUser].map((user) => ({
        id: user.id,
        username: user.username,
        imageUrl: user.image_url,
        followers: 0,
        following: 0,
      }))
    );
    const newResponse = await server.get("/users/?username=unrelated");
    expect(newResponse.status).toBe(httpStatus.OK);
    expect(newResponse.body).toEqual([
      {
        id: thirdUser.id,
        username: thirdUser.username,
        imageUrl: thirdUser.image_url,
        followers: 0,
        following: 0,
      },
    ]);
  });
});
