import { Context, RouterMiddleware } from "oak";

import { createResponse, schema } from "../lib/index.ts";
import { getStorage } from "../service/storage/index.ts";

const storage = getStorage({ tableName: "Posts" });

export const getPosts: RouterMiddleware<string> = async (ctx) => {
  const posts = await storage.select(
    { type: ["NOT IN", ["draft"]] },
    {
      desc: "updatedAt",
      fields: [
        "timestamp",
        "title",
        "content",
        "excerpt",
        "sticky",
        "authors",
        "slug",
        "type",
        "category",
        "tags",
        "postMetas",
      ],
    },
  );
  ctx.response.body = createResponse({ data: posts });
};

export const getPost: RouterMiddleware<string> = async (ctx) => {
  const { slug } = ctx.params;
  const post = (await storage.select(
    { slug },
    {
      desc: "updatedAt",
      fields: [
        "timestamp",
        "title",
        "content",
        "excerpt",
        "sticky",
        "authors",
        "id",
        "type",
        "category",
        "tags",
        "postMetas",
        "adjacentPosts",
      ],
    },
  ))[0];

  ctx.response.body = createResponse({ data: post });
};

export const createPost: RouterMiddleware<string> = async (ctx) => {
  const {
    authors,
    category,
    content,
    excerpt,
    postMetas,
    sticky,
    tags,
    timestamp,
    title,
  } = await (ctx.request.body({ type: "json" }).value);
  const { value, error } = schema.post.validate(ctx.request.body);
  if (error) {
    ctx.throw(400, JSON.stringify(error.details));
  }

  const resp = await storage.add({
    authors,
    category,
    content,
    excerpt,
    postMetas,
    sticky,
    tags,
    timestamp,
    title,
  });
  ctx.response.body = createResponse({
    data: resp,
  });
};

export const deletePost: RouterMiddleware<string> = async (ctx) => {
  const { slug } = ctx.params;

  await storage.delete({
    slug,
  });
  ctx.response.body = createResponse({
    error: "",
  });
};
