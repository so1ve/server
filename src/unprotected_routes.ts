import Router from "@koa/router";

import { API_VERSION } from "./lib";
import { categories, general, posts, tags } from "./controller";

const unprotectedRouter = new Router({
  prefix: `/${API_VERSION}`,
});

// Hello World route
unprotectedRouter.get("/", general.helloWorld);

// Post list route
unprotectedRouter.get("/posts", posts.getPosts);

// Post detail route
unprotectedRouter.get("/posts/:id", posts.getPost);

// Categories route
unprotectedRouter.get("/categories", categories.getCategories);

// Category detail route
unprotectedRouter.get("/categories/:slug", categories.getCategory);

// Tags route
unprotectedRouter.get("/tags", tags.getTags);

// Tag detail route
unprotectedRouter.get("/tags/:slug", tags.getTag);

export { unprotectedRouter };
