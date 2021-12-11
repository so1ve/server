import { blue, bold, green } from "https://deno.land/std@0.117.0/fmt/colors.ts";
import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { createServer } from "../mod.ts";

const PORT = 4000;
const app = createServer();
app.listen({ port: PORT });
console.log(
  `${bold(green("Success"))} Server running at ${
    blue(`http://localhost:${PORT.toString()}`)
  }`,
);
