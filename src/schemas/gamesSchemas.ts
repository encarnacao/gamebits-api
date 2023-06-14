import { searchQuery } from "@/protocols";
import Joi from "joi";

export const searchSchema = Joi.object<searchQuery>({
  name: Joi.string().required(),
});