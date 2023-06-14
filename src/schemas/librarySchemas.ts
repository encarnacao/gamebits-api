import { LibraryUpdate, idParams } from "@/protocols";
import Joi from "joi";

export const librarySchema = Joi.object<idParams>({
  id: Joi.number().required(),
});

export const libraryUpdateSchema = Joi.object<LibraryUpdate>({
  status: Joi.string().valid("finished", "platinum", "completion_time").required(),
  completion_time: Joi.number().min(0).precision(1),
});
