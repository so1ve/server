import error from "oak_json_error";

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
