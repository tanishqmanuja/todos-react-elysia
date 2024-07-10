import pc from "picocolors";

import { app } from "./app";
import { env } from "./env";

const ELYSIA_VERSION = import.meta.require("elysia/package.json").version;

const startTime = performance.now();

// clear screen
process.stdout.write("\x1Bc\n");

app.listen(
	{
		port: env.PORT,
		hostname: env.HOSTNAME,
	},
	(server) => {
		const duration = performance.now() - startTime;

		console.log(
			`🦊 ${pc.green(`${pc.bold("Elysia")} v${ELYSIA_VERSION}`)} ${pc.gray("started in")} ${pc.bold(duration.toFixed(2))} ms\n`,
		);
		console.log(
			`${pc.green(" ➜ ")} ${pc.bold("Server")}:   ${pc.cyan(String(server.url))}`,
		);
		console.log(
			`${pc.green(" ➜ ")} ${pc.bold("Database")}: ${pc.cyan(env.DATABASE_URL)}`,
			"\n",
		);
	},
);
