import { Application, ApplicationOptions } from "oak";

import { unprotectedRouter } from "./unprotected_routes.ts";
import { protectedRouter } from "./protected_routes.ts";

export const createServer = (
  options?: ApplicationOptions<Record<string, any>>,
): Application => {
  const app = new Application(options);

  app.use(unprotectedRouter.routes())
    .use(unprotectedRouter.allowedMethods({ throw: true }));
  app.use(protectedRouter.routes())
    .use(protectedRouter.allowedMethods({ throw: true }));

  return app;
};
