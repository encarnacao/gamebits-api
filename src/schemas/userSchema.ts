import Joi from "joi";
import { type Prisma } from "@prisma/client";

export const userSchema = Joi.object<UserParams>({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	picture_url: Joi.string(),
});
// let it be clear that I don't know exactly what this does
type UserParams = Pick<
	Prisma.usersCreateInput,
	"name" | "email" | "password" | "picture_url"
>;
