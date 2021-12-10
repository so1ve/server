import { Router } from "oak";

import { API_VERSION } from "./lib/mod.ts";
import { posts } from "./controller/mod.ts";

const protectedRouter = new Router({
  prefix: `/${API_VERSION}`,
});

// Create post route
protectedRouter.post("/posts", posts.createPost);

// Delete post route
protectedRouter.delete("/posts/:id", posts.deletePost);

export { protectedRouter };
