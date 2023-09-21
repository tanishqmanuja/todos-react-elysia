import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "../src/db";

try {
  migrate(db, { migrationsFolder: ".drizzle" });
  console.log("Migration Done!");
  process.exit(0);
} catch (err) {
  console.log("Migration Failed :(");
  console.log(err);
  process.exit(1);
}
