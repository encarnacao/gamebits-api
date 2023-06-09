import { Request, Response, NextFunction } from "express";
import { ErrorType } from "@/protocols";

export function handleApplicationErrors(
	err: ErrorType,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	let error = { ...err };
	delete error.status;
	if (!err.status) {
		console.log(err);
		err.status = 500;
	}
	return res.status(err.status).send(error);
}
