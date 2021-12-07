import { Application, ApplicationOptions } from "oak";

import { protectedRouter } from "./protected_routes.ts";

export const createServer = (
  options?: ApplicationOptions<Record<string, any>>,
): Application => {
  const app = new Application(options);

  app.use(protectedRouter.routes());
  app.use(protectedRouter.allowedMethods({ throw: true }));

  return app;
};
