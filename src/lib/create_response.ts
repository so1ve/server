import status from "statuses";

type CreateResponseArguments = {
  statusCode?: number;
  message?: string;
  data?: unknown;
  error?: string;
};
type CreateResponseResult = {
  statusCode: number;
  message: string;
  data?: unknown;
  error?: string;
};

const overrideMessages: Record<string, string> = {
  200: "Success",
};

export const createResponse = ({
  statusCode = 200,
  message,
  data,
  error,
}: CreateResponseArguments): CreateResponseResult => {
  const response: CreateResponseResult = {
    statusCode,
    message: (message ?? overrideMessages[statusCode.toString()]) ||
      status(statusCode).toString(),
  };
  data && (response.data = data);
  error && (response.error = error);

  return response;
};
