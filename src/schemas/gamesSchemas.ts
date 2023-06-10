import Joi from "joi";

export const searchSchema = Joi.object<searchQuery>({
  name: Joi.string().required(),
});

export interface searchQuery {
  name: string;
}