import Joi from "joi";

const validRatings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

export const reviewSchema = Joi.object<ReviewBody>({
    rating: Joi.number().valid(...validRatings).required(),
    review: Joi.string().min(1).required(),
    game: Joi.string().min(1).required(),
});


// let it be clear that I don't know exactly what this does
export type ReviewBody = {
    rating: number;
    review: string;
    game: string;
};
