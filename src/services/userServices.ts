import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import errors from "../errors/index.js";
import userRepository from "../repositories/userRepository.js";

async function createUser(user: Prisma.usersCreateInput) {
	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;
	const createdUser = await userRepository.createUser(user);
	if (createdUser) {
		return createdUser;
	}
	return null;
}

async function getUserByEmail(body: SignInBody) {
	const user = await userRepository.findUserByEmail(body.email);
	if (!user) {
		throw errors.invalidCredentialsError();
	}
	const confirmPassword = await bcrypt.compare(body.password, user.password);
	if (!confirmPassword) {
		throw errors.invalidCredentialsError();
	}
	return user;
}

export type SignInBody = Pick<Prisma.usersCreateInput, "email" | "password">;

export default { createUser, getUserByEmail };
