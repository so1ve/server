import { blue, bold, green } from "fmt/colors.ts";

import { createServer } from "../src/mod.ts";

const PORT = 4000;
const app = createServer();
app.listen({ port: PORT });
console.log(
  `${bold(green("Success"))} Server running at ${
    blue(`http://localhost:${PORT.toString()}`)
  }`,
);
