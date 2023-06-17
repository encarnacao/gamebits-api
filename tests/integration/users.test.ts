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
  })
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
