import { votingSchema } from "@/schemas";
import { faker } from "@faker-js/faker";

describe("votingSchema", () => {
  const generateValidInput = () => ({
    reviewId: faker.datatype.number(),
    upVote: faker.datatype.boolean(),
  });
  describe("when reviewId is not valid", () => {
    it("should return an error if reviewId is not present", () => {
      const vote = generateValidInput();
      delete vote.reviewId;
      const { error } = votingSchema.validate(vote);
      expect(error).toBeDefined();
    });
    it("should return an error if reviewId is not a valid number", () => {
      const vote = {
        reviewId: faker.lorem.word(),
        upVote: faker.datatype.boolean(),
      };
      const { error } = votingSchema.validate(vote);
      expect(error).toBeDefined();
    });
  });
  describe("when upVote is not valid", () => {
    it("should return an error if upVote is not present", () => {
      const vote = generateValidInput();
      delete vote.upVote;
      const { error } = votingSchema.validate(vote);
      expect(error).toBeDefined();
    });
    it("should return an error if upVote is not a valid boolean", () => {
      const vote = {
        reviewId: faker.datatype.number(),
        upVote: faker.lorem.word(),
      };
      const { error } = votingSchema.validate(vote);
      expect(error).toBeDefined();
    });
  });
  describe("when input is valid", () => {
    it("should return undefined if input is valid", () => {
      const vote = generateValidInput();
      const { error } = votingSchema.validate(vote);
      expect(error).toBeUndefined();
    });
  });
});
