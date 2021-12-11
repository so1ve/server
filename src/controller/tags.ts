import { RouterMiddleware } from "../deps.ts";

import { createResponse } from "../lib/mod.ts";
import { getStorage } from "../service/storage/mod.ts";

export const getTags: RouterMiddleware<string> = (ctx) => {
  ctx.response.body = createResponse({
    data: [
      {
        name: "TypeScript",
        slug: "ts",
        count: 4404024,
      },
      {
        name: "React",
        slug: "react",
        count: 666,
      },
    ],
  });
};

export const getTag: RouterMiddleware<string> = (ctx) => {
  const { slug } = ctx.params;

  ctx.response.body = createResponse({
    data: {
      name: slug,
      slug,
      count: 1,
      posts: ["1"],
    },
  });
};
