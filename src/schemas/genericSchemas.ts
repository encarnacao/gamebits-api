import { idParams } from "@/protocols";
import Joi from "joi";

export const paramsSchema = Joi.object<idParams>({
  id: Joi.number().required(),
});
