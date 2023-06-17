import "express-async-errors";
import "dotenv/config";
import cors from "cors";
import express, { json } from "express";
import router from "@/routers";
import { handleApplicationErrors } from "@/middlewares";
import { connectDb, disconnectDB, loadEnv } from "@/config";

const app = express();

loadEnv();


app.use(cors())
   .use(json())
   .use(router)
   .use(handleApplicationErrors);


export function init(){
	connectDb();
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
	await disconnectDB();
}

export default app;
