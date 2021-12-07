import error from "koa-json-error";

import { createResponse } from "../lib";

const errorHandler = error({
  format(err) {
    return createResponse({
      statusCode: err.status,
      error: err.message,
      message: err.message,
    });
  },
});

export default errorHandler;
