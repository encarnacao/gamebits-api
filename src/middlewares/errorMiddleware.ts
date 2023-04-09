
import { Request, Response, NextFunction } from 'express';
import { ErrorType } from '../errors/index.js';

export function handleApplicationErrors(err:ErrorType, req:Request, res:Response, next:NextFunction) {
	let error = { ...err };
	delete error.status;
	if (!err.status) err.status = 500;
	return res.status(err.status).send(error);
}