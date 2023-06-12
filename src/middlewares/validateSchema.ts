import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import err from "@/errors";

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'body');
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'params');
}

export function validateQuery<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'query');
}

function validate(schema: ObjectSchema, type: 'body' | 'params' |  'query') {
	return (req: Request, _res: Response, next: NextFunction) => {
		const { error } = schema.validate(req[type], { abortEarly: false });
		if (error) {
			const errors = error.details.map((err) => err.message);
			throw err.unprocessableEntityError(errors);
		}
		next();
	};
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;