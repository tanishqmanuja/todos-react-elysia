import { type Static, type TSchema, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

function parseEnv<T extends TSchema>(schema: T, env: unknown): Static<T> {
	const converted = Value.Convert(schema, Value.Default(schema, env));
	const isValid = Value.Check(schema, converted);
	if (!isValid) {
		const errors = Value.Errors(schema, converted);
		throw new Error(
			`Invalid environment variables: ${[...errors]
				.map((e) => `${e.path}: ${e.message}`)
				.join(", ")}`,
		);
	}

	return converted;
}

const EnvDTO = Type.Object({
	NODE_ENV: Type.Enum(
		{
			development: "development",
			production: "production",
		},
		{ default: "development" },
	),
	PORT: Type.Number({ default: 3000 }),
	HOSTNAME: Type.String({ default: "localhost" }),
	DATABASE_URL: Type.String({ default: "file:./local.db" }),
	DATABASE_AUTH_TOKEN: Type.Optional(Type.String()),
});

export const isProd = process.env.NODE_ENV === "production";
export const env = parseEnv(EnvDTO, process.env);
