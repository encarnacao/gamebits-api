import { Prisma, type users } from "@prisma/client";
import bcrypt from "bcrypt";
import errors from "@/errors";
import userRepository from "@/repositories/userRepository";
import { SignInBody } from "@/protocols";
import { formatUser } from "@/helpers";

async function createUser(user: Prisma.usersCreateInput) {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;
  const createdUser = await userRepository.createUser(user);
  return createdUser;
}

async function getUserByEmail(body: SignInBody) {
  const user = await userRepository.findUser(body.email);
  if (!user) {
    throw errors.invalidCredentialsError();
  }
  const confirmPassword = await bcrypt.compare(body.password, user.password);
  if (!confirmPassword) {
    throw errors.invalidCredentialsError();
  }
  return user;
}

async function findUsernamePartial(username: string) {
  const search = await userRepository.findUsernamePartial(username);
  const users = search.map((user) => {
    const formattedUser = formatUser(user);
    delete formattedUser.followedByUser;
    return formattedUser;
  });
  return users;
}

async function findAllUsers() {
  const search = await userRepository.findAllUsers();
  const users = search.map((user) => {
    const formattedUser = formatUser(user);
    delete formattedUser.followedByUser;
    return formattedUser;
  });
  return users;
}

async function getUserByUsername(username: string, id?: number) {
  const search = await userRepository.findUsername(username);
  if (!search) {
    throw errors.notFoundError();
  }
  const user = formatUser(search, id);
  return user;
}

export default {
  createUser,
  getUserByEmail,
  findUsernamePartial,
  findAllUsers,
  getUserByUsername,
};
