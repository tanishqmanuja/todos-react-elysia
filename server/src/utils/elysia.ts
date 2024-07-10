import type Elysia from "elysia";

export function pluginConditionally<Plugin = never>(
	condition: boolean,
	plugin: Plugin,
) {
	return (app: Elysia) => (condition ? plugin : app);
}
