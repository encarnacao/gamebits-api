import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";

async function createUser(user: Prisma.usersCreateInput){
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    const createdUser = await userRepository.createUser(user);
    if(createdUser){
        return createdUser;
    }
    return null;
}

export default { createUser };