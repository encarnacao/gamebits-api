import { gameParams, searchQuery } from "@/protocols";
import Joi from "joi";

export const searchSchema = Joi.object<searchQuery>({
  name: Joi.string().required(),
});

export const gameParamsSchema = Joi.object<gameParams>({
  id: Joi.number().required(),
});