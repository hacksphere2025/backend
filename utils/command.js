const { isAppError, UnkownError } = require("./error")
const { logger } = require("./logger")

module.exports.GeneralErrorHandler = (error, errorMsg) => {
  if (isAppError(error)) {
    return error;
  }
  logger.error("Error:", error);
  return new UnkownError(errorMsg || "Internal Server Error", error.message);
};

