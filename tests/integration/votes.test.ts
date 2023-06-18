import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDatabase, createValidReview } from "../helpers";
import jwt from "jsonwebtoken";
import { createUser, createVote } from "../factories";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDatabase();
});

const server = supertest(app);

describe("POST /votes", () => {
  const generateValidBody = (reviewId: number, upVote: boolean) => ({
    reviewId,
    upVote,
  });
  it("should return 401 when token is not provided", async () => {
    const response = await server.post("/votes");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return 401 when token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .post("/votes")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return 422 when no body is sent", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .post("/votes")
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 422 when body is invalid", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const body = { [faker.lorem.word()]: faker.lorem.word() };
      const response = await server
        .post("/votes")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 404 when review does not exist", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const body = generateValidBody(
        faker.datatype.number(),
        faker.datatype.boolean()
      );
      const response = await server
        .post("/votes")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return 409 when user already voted", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const { review } = await createValidReview();
      const body = generateValidBody(review.id, faker.datatype.boolean());
      await createVote(user.id, review.id, faker.datatype.boolean());
      const response = await server
        .post("/votes")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(response.status).toBe(httpStatus.CONFLICT);
    });
    it("should return 201 when body is valid", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const { review } = await createValidReview();
      const body = generateValidBody(review.id, faker.datatype.boolean());
      const response = await server
        .post("/votes")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        review_id: review.id,
        user_id: user.id,
        up_vote: body.upVote,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });
});

describe("DELETE /votes/:id", () => {
  it("should return 401 when token is not provided", async () => {
    const response = await server.delete("/votes/1");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return 401 when token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .delete("/votes/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return 422 when params are invalid", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .delete(`/votes/${faker.lorem.word()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 404 when vote does not exist", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const { review } = await createValidReview();
      const response = await server
        .delete(`/votes/${review.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return 204 when vote is deleted", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const { review } = await createValidReview();
      await createVote(user.id, review.id, faker.datatype.boolean());
      const response = await server
        .delete(`/votes/${review.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NO_CONTENT);
    });
  });
});

describe("PUT /votes/:id", () => {
  it("should return 401 when token is not provided", async () => {
    const response = await server.put("/votes/1");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return 401 when token is invalid", async () => {
    const token = faker.lorem.word();
    const response = await server
      .put("/votes/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should return 422 when params are invalid", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const response = await server
        .put(`/votes/${faker.lorem.word()}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
    it("should return 404 when vote does not exist", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const { review } = await createValidReview();
      const response = await server
        .put(`/votes/${review.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
    it("should return 200 when vote is updated", async () => {
      const user = await createUser();
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const { review } = await createValidReview();
      const vote = await createVote(
        user.id,
        review.id,
        faker.datatype.boolean()
      );
      const response = await server
        .put(`/votes/${review.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: vote.id,
        review_id: review.id,
        user_id: user.id,
        up_vote: !vote.up_vote,
        created_at: vote.created_at.toISOString(),
        updated_at: expect.any(String),
      });
    });
  });
});
