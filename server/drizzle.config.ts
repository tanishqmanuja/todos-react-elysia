import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./.drizzle",
  driver: "libsql",
  breakpoints: true,
  dbCredentials: {
    url: "file:./todos.db",
  },
} satisfies Config;
