import { Router } from "./deps.ts";

import { API_VERSION } from "./lib/mod.ts";
import { categories, posts, tags } from "./controller/mod.ts";

const unprotectedRouter = new Router({
  prefix: `/${API_VERSION}`,
});

// Post list route
unprotectedRouter.get("/posts", posts.getPosts);

// Post detail route
unprotectedRouter.get("/posts/:id", posts.getPost);

// Categories route
// unprotectedRouter.get("/categories", categories.getCategories);

// Category detail route
// unprotectedRouter.get("/categories/:slug", categories.getCategory);

// Tags route
unprotectedRouter.get("/tags", tags.getTags);

// Tag detail route
// unprotectedRouter.get("/tags/:slug", tags.getTag);

export { unprotectedRouter };
