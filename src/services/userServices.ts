import { Prisma, type users } from "@prisma/client";
import bcrypt from "bcrypt";
import errors from "@/errors";
import userRepository from "@/repositories/userRepository";
import { SignInBody } from "@/protocols";

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

export default { createUser, getUserByEmail };
