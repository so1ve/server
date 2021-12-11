import { RouterMiddleware } from "../deps.ts";

import { createResponse } from "../lib/mod.ts";
import { getStorage } from "../service/storage/mod.ts";

export const getCategories: RouterMiddleware<string> = (ctx) => {
  ctx.response.body = createResponse({
    data: [
      {
        name: "TypeScript",
        slug: "ts",
        count: 114514,
        posts: [
          "1",
        ],
      },
      {
        name: "文学",
        slug: "writing",
        count: 1919810,
        posts: [
          "2",
        ],
      },
    ],
  });
};

export const getCategory: RouterMiddleware<string> = (ctx) => {
  const { slug } = ctx.params;

  ctx.response.body = createResponse({
    data: {
      name: slug,
      slug,
      count: 114514,
      posts: [
        "1",
      ],
    },
  });
};
