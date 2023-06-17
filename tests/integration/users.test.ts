import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDatabase } from "../helpers";
import { createUser } from "../factories/users-factory";

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
