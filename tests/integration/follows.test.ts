import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDatabase } from "../helpers";
import jwt from "jsonwebtoken";
import { createFollow, createUser } from "../factories";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDatabase();
});

const server = supertest(app);

describe("POST /follows", () => {
  it("should return status 401 when token is not provided", async () => {
    const response = await server.post(`/follows/${faker.datatype.number()}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return status 401 when token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .post(`/follows/${faker.datatype.number()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return status 422 when id is invalid", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/follows/${faker.lorem.word()}`)
        .set("Authorization", `Bearer ${token}`);
    });
    it("should return status 404 when user is not found", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/follows/${faker.datatype.number()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return status 400 when user tries to follow himself", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post(`/follows/${user.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    it("should return status 409 when user tries to follow someone he already follows", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const followed = await createUser();
      await createFollow(user.id, followed.id);
      const response = await server
        .post(`/follows/${followed.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });
    it("should return status 201 when user follows someone successfully", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const followed = await createUser();
      const response = await server
        .post(`/follows/${followed.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        following: user.id,
        followed: followed.id,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });
});
