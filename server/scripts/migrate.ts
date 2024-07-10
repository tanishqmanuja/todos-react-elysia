import { migrate } from "drizzle-orm/libsql/migrator";

import config from "../drizzle.config";
import { db } from "../src/db";

migrate(db, { migrationsFolder: config.out })
	.then(() => {
		console.log("Migration successful");
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
