import Joi from "joi";
import { VotingBody } from "@/protocols";

export const votingSchema = Joi.object<VotingBody>({
  reviewId: Joi.number().required(),
  upVote: Joi.boolean().required(),
});
