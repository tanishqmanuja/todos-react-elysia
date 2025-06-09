import type { Config } from "drizzle-kit";

import { env } from "./src/env";

const dbCredentials = {
	url: env.DATABASE_URL,
	authToken: env.DATABASE_AUTH_TOKEN,
};

export default {
	dbCredentials,
	dialect: "turso",
	out: "./drizzle",
	breakpoints: true,
	schema: "./src/db/schema.ts",
} satisfies Config;
