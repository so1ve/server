import { RouterContext } from "oak";

import { createResponse } from "../lib/index.ts";
import { getStorage } from "../service/storage/index.ts";

class CategoriesController {
  public static getCategories(ctx: RouterContext<string>): void {
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
  }

  public static getCategory(ctx: RouterContext<string>): void {
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
  }
}

export default CategoriesController;
