import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import userServices, { SignInBody } from "../services/userServices.js";
import jwt from "jsonwebtoken";
import errors from "@/errors";


async function createUser(req: Request, res: Response, next: NextFunction) {
	try {
		const create = await userServices.createUser(req.body);
		delete create.password;
		res.send(create);
	} catch (err) {
		next(err);
	}
}

async function signIn(req: Request, res: Response, next: NextFunction) {
	const userData = req.body as SignInBody;
	if(!userData.email || !userData.password)
		throw errors.badRequestError("Email and password are required");
	try {
		const user = await userServices.getUserByEmail(userData);
		const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
		res.send({ token });
	} catch (err) {
		next(err);
	}
}

export default { createUser, signIn };
