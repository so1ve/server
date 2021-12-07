import { Router } from "oak";

import { API_VERSION } from "./lib/index.ts";
import { categories, posts, tags } from "./controller/index.ts";

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
