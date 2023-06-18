import { ReviewBody } from "@/protocols";
import Joi from "joi";

const validRatings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export const reviewSchema = Joi.object<ReviewBody>({
    rating: Joi.number().valid(...validRatings).required(),
    text: Joi.string().min(1).required(),
    game_id: Joi.number().min(1).required(),
});
