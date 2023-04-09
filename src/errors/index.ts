function unprocessableEntityError(message:string) {
	return {
		status: 422,
		name: "UnprocessableEntityError",
		message,
	};
}

function emailConflictError(email:string) {
	return {
		status: 409,
		name: "EmailConflictError",
		message: "There is already an user with given email",
		email,
	};
}

function unauthorizedError() {
	return {
		status: 401,
		name: "UnauthorizedError",
		message: "You must be signed in to continue",
	};
}

function notFoundError() {
	return {
		status: 404,
		name: "NotFoundError",
		message: "No result for this search!",
	};
}

function invalidCredentialsError() {
	return {
		status: 401,
		name: "InvalidCredentialsError",
		message: "Email or password are incorrect",
	};
}

function badRequestError(message:string) {
	return {
		status: 400,
		name: "BadRequestError",
		message,
	};
}


export type ErrorType = {
    status: number;
    name: string;
    message: string;
    email?: string;
    file?: string;
}

export default {
	unprocessableEntityError,
	emailConflictError,
	unauthorizedError,
	notFoundError,
	invalidCredentialsError,
	badRequestError,
};