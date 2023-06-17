import { userSchema, userSignInSchema } from "@/schemas";
import { faker } from "@faker-js/faker";

describe("userSchema", () => {
  const generateValidInput = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
  });
  describe("when e-mail is not valid", () => {
    it("should return an error if email is not present", () => {
      const user = generateValidInput();
      delete user.email;
      const { error } = userSchema.validate(user);
      expect(error).toBeDefined();
    });
    it("should return an error if email is not a valid email", () => {
      const user = generateValidInput();
      user.email = faker.lorem.word();
      const { error } = userSchema.validate(user);
      expect(error).toBeDefined();
    });
  });
  describe("when password is not valid", () => {
    it("should return an error if password is not present", () => {
      const user = generateValidInput();
      delete user.password;
      const { error } = userSchema.validate(user);
      expect(error).toBeDefined();
    });
    it("should return an error if password is not a valid password", () => {
      const user = generateValidInput();
      user.password = faker.lorem.word({ length: { min: 1, max: 5 } });
      const { error } = userSchema.validate(user);
      expect(error).toBeDefined();
    });
  });
  describe("when username is not valid", () => {
    it("should return an error if username is not present", () => {
      const user = generateValidInput();
      delete user.username;
      const { error } = userSchema.validate(user);
      expect(error).toBeDefined();
    });
  });
  describe("when input is valid", () => {
    it("should return undefined if input is valid", () => {
      const user = generateValidInput();
      const { error } = userSchema.validate(user);
      expect(error).toBeUndefined();
    });
  });
});

describe("userSignInSchema", () => {
  const generateValidInput = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
  });

  it("should return undefined if input is valid", () => {
    const user = generateValidInput();
    const { error } = userSignInSchema.validate(user);
    expect(error).toBeUndefined();
  });

  it("should return an error if email is missing", () => {
    const user = {
      password: faker.internet.password(),
    };
    const { error } = userSignInSchema.validate(user);
    expect(error).toBeDefined();
  });

  it("should return an error if email is invalid", () => {
    const user = {
      email: "invalid-email",
      password: faker.internet.password(),
    };
    const { error } = userSignInSchema.validate(user);
    expect(error).toBeDefined();
  });

  it("should return an error if password is missing", () => {
    const user = {
      email: faker.internet.email(),
    };
    const { error } = userSignInSchema.validate(user);
    expect(error).toBeDefined();
  });
});
