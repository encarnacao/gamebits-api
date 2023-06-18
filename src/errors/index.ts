import httpStatus from "http-status";

function unprocessableEntityError(message: string[]) {
  return {
    status: httpStatus.UNPROCESSABLE_ENTITY,
    name: "UnprocessableEntityError",
    message,
  };
}

function unauthorizedError() {
  return {
    status: httpStatus.UNAUTHORIZED,
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function notFoundError(message?: string) {
  return {
    status: httpStatus.NOT_FOUND,
    name: "NotFoundError",
    message: message || "No result for this search!",
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
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
  badRequestError,
  forbiddenError,
  conflictError,
};
