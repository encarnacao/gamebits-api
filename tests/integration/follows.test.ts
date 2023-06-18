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

describe("DELETE /follows/:id", () => {
  it("should return status 401 when token is not provided", async () => {
    const response = await server.delete(`/follows/${faker.datatype.number()}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return status 401 when token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .delete(`/follows/${faker.datatype.number()}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return status 422 when id is invalid", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete(`/follows/${faker.lorem.word()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return status 404 when user is not found", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete(`/follows/${faker.datatype.number()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return status 204 when user unfollows someone successfully", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const followed = await createUser();
      await createFollow(user.id, followed.id);
      const response = await server
        .delete(`/follows/${followed.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NO_CONTENT);
    });
  });
});

describe("GET /follows/:id/followers", () => {
  it("should return status 422 if param is invalid", async () => {
    const response = await server.get(
      `/follows/${faker.lorem.word()}/followers`
    );
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return status 404 if user is not found", async () => {
    const response = await server.get(
      `/follows/${faker.datatype.number()}/followers`
    );
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return status 404 if user has no followers", async () => {
    const user = await createUser();
    const response = await server.get(`/follows/${user.id}/followers`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return status 200 and followers if user has followers", async () => {
    const user = await createUser();
    const followed = await createUser();
    await createFollow(user.id, followed.id);
    const response = await server.get(`/follows/${followed.id}/followers`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: user.id,
        username: user.username,
        image_url: user.image_url,
      },
    ]);
  });
});

describe("GET /follows/:id/following", () => {
  it("should return status 422 if param is invalid", async () => {
    const response = await server.get(
      `/follows/${faker.lorem.word()}/following`
    );
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return status 404 if user is not found", async () => {
    const response = await server.get(
      `/follows/${faker.datatype.number()}/following`
    );
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return status 404 if user is not following anyone", async () => {
    const user = await createUser();
    const response = await server.get(`/follows/${user.id}/following`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should return status 200 and following if user is following someone", async () => {
    const user = await createUser();
    const followed = await createUser();
    await createFollow(user.id, followed.id);
    const response = await server.get(`/follows/${user.id}/following`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      {
        id: followed.id,
        username: followed.username,
        image_url: followed.image_url,
      },
    ]);
  });
});
