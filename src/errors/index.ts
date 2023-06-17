import httpStatus from "http-status";

function unprocessableEntityError(message: string[]) {
  return {
    status: httpStatus.UNPROCESSABLE_ENTITY,
    name: "UnprocessableEntityError",
    message,
  };
}

function emailConflictError(email: string) {
  return {
    status: httpStatus.CONFLICT,
    name: "EmailConflictError",
    message: "There is already an user with given email",
    email,
  };
}

function unauthorizedError() {
  return {
    status: httpStatus.UNAUTHORIZED,
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function notFoundError() {
  return {
    status: httpStatus.NOT_FOUND,
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

function invalidCredentialsError() {
  return {
    status: httpStatus.UNAUTHORIZED,
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

function badRequestError(message: string) {
  return {
    status: httpStatus.BAD_REQUEST,
    name: "BadRequestError",
    message,
  };
}

function forbiddenError() {
  return {
    status: httpStatus.FORBIDDEN,
    name: "ForbiddenError",
    message: "You are not allowed to do this",
  };
}

function conflictError() {
  return {
    status: httpStatus.CONFLICT,
    name: "ConflictError",
    message: "This resource already exists",
  };
}

export default {
  unprocessableEntityError,
  emailConflictError,
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
  badRequestError,
  forbiddenError,
  conflictError,
};
