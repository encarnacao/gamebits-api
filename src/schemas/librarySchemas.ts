import { idParams } from "@/protocols";
import Joi from "joi";

export const librarySchema = Joi.object<idParams>({
  id: Joi.number().required(),
});