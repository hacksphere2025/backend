import { isAppError, UnkownError } from "./error";
import {logger} from  "./logger.util";

export const GeneralErrorHandler = (error, errorMsg) => {
  if (isAppError(error)) {
    return error;
  }
  logger.error("Error:", error);
  return new UnkownError(errorMsg || "Internal Server Error", error.message);
};

