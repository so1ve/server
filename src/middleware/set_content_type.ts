import { DefaultContext, DefaultState, Middleware } from "koa";

const setDataType: Middleware<DefaultState, DefaultContext> = (ctx) => {
  ctx.type = "json";
};

export default setDataType;
