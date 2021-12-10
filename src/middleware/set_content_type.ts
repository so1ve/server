import { Middleware } from "oak";

const setContentType: Middleware = (ctx) => {
  ctx.response.type = "json";
};

export default setContentType;
