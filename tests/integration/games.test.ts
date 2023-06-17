import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app, { init } from "@/app";
import { cleanDatabase } from "../helpers";

beforeAll(async () => {
  await init();
});
beforeEach(async () => {
  await cleanDatabase();
});

const server = supertest(app);

describe("POST /games", () => {
  it("should return 422 if no query param is sent", async () => {
    const response = await server.post("/games").query({});
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return 422 if query params are invalid", async () => {
    const response = await server.post(
      `/games?${faker.lorem.word()}=${faker.lorem.word()}`
    );
    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it("should return 200 if query params are valid", async () => {
    const response = await server.post("/games").query({ name: "mario" });
    expect(response.status).toBe(httpStatus.OK);
  });
});
