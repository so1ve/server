import { Router } from "oak";

import { API_VERSION } from "./lib/index.ts";
import { posts } from "./controller/index.ts";

const protectedRouter = new Router({
  prefix: `/${API_VERSION}`,
});

// Create post route
protectedRouter.post("/posts", posts.createPost);

// Delete post route
protectedRouter.delete("/posts/:id", posts.deletePost);

export { protectedRouter };
