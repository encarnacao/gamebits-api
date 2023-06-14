import { LibraryUpdate } from "@/protocols";
import Joi from "joi";

export const libraryUpdateSchema = Joi.object<LibraryUpdate>({
  status: Joi.string()
    .valid("finished", "platinum", "completion_time")
    .required(),
  completion_time: Joi.number().min(0).precision(1),
});
