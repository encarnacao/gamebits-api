import { UserParams } from "@/protocols";
import Joi from "joi";

export const userSchema = Joi.object<UserParams>({
  username: Joi.string()
    .required()
    .min(3)
    .custom((value, helpers) => {
      if (value.trim().length === 0) {
        return helpers.error("any.invalid");
      }
      return value;
    }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const userSignInSchema = Joi.object<UserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const userQuerySchema = Joi.object<Pick<UserParams, "username">>({
  username: Joi.string()
    .required()
    .min(3)
    .custom((value, helpers) => {
      if (value.trim().length === 0) {
        return helpers.error("any.invalid");
      }
      return value;
    }),
});
