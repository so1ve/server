import { Context, RouterContext } from "oak";

import { createResponse } from "../lib/mod.ts";
import { getStorage } from "../service/storage/mod.ts";

class TagsController {
  public static getTags(ctx: Context): void {
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
  }

  public static getTag(ctx: RouterContext<string>): void {
    const { slug } = ctx.params;

    ctx.response.body = createResponse({
      data: {
        name: slug,
        slug,
        count: 1,
        posts: ["1"],
      },
    });
  }
}

export default TagsController;
