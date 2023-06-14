import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import userServices from "../services/userServices.js";
import jwt from "jsonwebtoken";
import { SignInBody, UserParams, idParams } from "@/protocols.js";


async function createUser(req: Request, res: Response, next: NextFunction) {
	const userData = req.body as UserParams;
	try {
		const create = await userServices.createUser(userData);
		delete create.password;
		res.send(create);
	} catch (err) {
		next(err);
	}
}

async function signIn(req: Request, res: Response, next: NextFunction) {
	const userData = req.body as SignInBody;
	try {
		const user = await userServices.getUserByEmail(userData);
		const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
		res.send({ token });
	} catch (err) {
		next(err);
	}
}

async function findUser(req: Request, res: Response, next: NextFunction) {
	const params = req.params as unknown as idParams;
	try {
		const user = await userServices.getUserById(Number(params.id));
		res.send(user);
	} catch (err) {
		next(err);
	}
}

export { createUser, signIn, findUser };
