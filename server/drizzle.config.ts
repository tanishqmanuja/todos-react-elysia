import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./.drizzle",
  driver: "better-sqlite",
  breakpoints: true,
  dbCredentials: {
    url: "./todos.db",
  },
} satisfies Config;
