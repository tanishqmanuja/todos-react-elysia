import Elysia from "elysia";
import pc from "picocolors";

import * as fmt from "./formatters";

export const logger = new Elysia({
	name: "@todos/server/logger",
})
	.state("__requestStartTime", [Number.NaN, Number.NaN] as [number, number])
	.onRequest(({ store }) => {
		store.__requestStartTime = process.hrtime();
	})
	.onResponse({ as: "global" }, ({ request, set, store }) => {
		const url = new URL(request.url);
		const duration = store.__requestStartTime;

		const components = [
			pc.green("✓"),
			pc.bold(fmt.method(request.method)),
			url.pathname,
			fmt.status(set.status),
			pc.dim(`[${fmt.duration(duration)}]`),
		];

		console.log(components.join(" "));
	})
	.onError({ as: "global" }, ({ request, error, store }) => {
		const url = new URL(request.url);
		const duration = store.__requestStartTime;
		const status = "status" in error ? error.status : "-/-";

		const components = [
			pc.red("✗"),
			pc.bold(fmt.method(request.method)),
			url.pathname,
			fmt.status(status),
			pc.dim(`[${fmt.duration(duration)}]`),
		];

		console.log(components.join(" "));
	});
