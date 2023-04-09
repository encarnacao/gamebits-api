import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function postComment(reviewId: number, userId: number, comment: string) {
	return await prisma.comments.create({
		data: {
			text: comment,
			reviews: {
				connect: { id: reviewId },
			},
			users: {
				connect: { id: userId },
			},
		},
	});
}

async function getCommentById(id: number) {
	return await prisma.comments.findUnique({
		where: { id },
		select: {
			id: true,
			text: true,
			users: {
				select: {
					id: true,
					name: true,
					picture_url: true,
				},
			},
		},
	});
}

async function deleteComment(id: number) {
	return await prisma.comments.delete({
		where: { id },
	});
}

async function editComment(id: number, text: string) {
	return await prisma.comments.update({
		where: { id },
		data: { text },
	});
}

export default { postComment, getCommentById, deleteComment, editComment };
