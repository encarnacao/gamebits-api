import Joi from "joi";
import { users } from "@prisma/client";

export const userSchema = Joi.object<UserParams>({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),

});
// let it be clear that I don't know exactly what this does
type UserParams = Pick<
	users, "username" | "email" | "password">
