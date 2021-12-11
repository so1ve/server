import { error } from "../deps.ts";

import { createResponse } from "../lib/mod.ts";

const errorHandler = error({
  format(err: Error & { status?: number }) {
    return createResponse({
      statusCode: err.status,
      error: err.message,
      message: err.message,
    });
  },
});

export default errorHandler;
