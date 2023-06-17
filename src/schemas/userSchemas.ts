import { UserParams } from "@/protocols";
import Joi from "joi";

export const userSchema = Joi.object<UserParams>({
	username: Joi.string().required().min(3),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),

});

export const userSignInSchema = Joi.object<UserParams>({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});