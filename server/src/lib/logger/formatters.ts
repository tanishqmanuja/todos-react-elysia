import pc from "picocolors";

export function duration(hrtime: [number, number]): string {
	const [seconds, nanoseconds] = process.hrtime(hrtime);
	const durationInMicroseconds = (seconds * 1e9 + nanoseconds) / 1e3;
	const durationInMilliseconds = (seconds * 1e9 + nanoseconds) / 1e6;

	if (seconds > 0) {
		return `${seconds.toPrecision(2)}s`;
	}
	if (durationInMilliseconds > 1) {
		return `${durationInMilliseconds.toPrecision(2)}ms`;
	}
	if (durationInMicroseconds > 1) {
		return `${durationInMicroseconds.toPrecision(4)}µs`;
	}
	if (nanoseconds > 0) {
		return `${nanoseconds.toPrecision(4)}ns`;
	}

	return "-/-";
}

export function method(method: string): string {
	switch (method) {
		case "GET":
			return pc.green("GET");

		case "POST":
			return pc.blue("POST");

		case "PUT":
			return pc.yellow("PUT");

		case "DELETE":
			return pc.red("DELETE");

		case "PATCH":
			return pc.magenta("PATCH");

		case "OPTIONS":
			return pc.cyan("OPTIONS");

		case "HEAD":
			return pc.gray("HEAD");

		default:
			return method;
	}
}

export function status(
	status: number | string | undefined,
): string | undefined {
	switch (status) {
		case 200:
			return pc.green(status);

		case 201:
			return pc.blue(status);

		case 204:
			return pc.yellow(status);

		case 400:
			return pc.red(status);

		case 401:
			return pc.magenta(status);

		case 403:
			return pc.cyan(status);

		case 404:
			return pc.gray(status);

		case 500:
			return pc.gray(status);

		default:
			return String(status);
	}
}
