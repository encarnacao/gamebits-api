import { PrismaClient, type Prisma } from "@prisma/client";
const prisma = new PrismaClient();

async function createUser(user: Prisma.usersCreateInput){
    return await prisma.users.create({
        data: {
            ...user
        }
    })
}

export default { createUser };