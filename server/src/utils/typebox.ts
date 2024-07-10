import { Omit, type TObject } from "@sinclair/typebox";

export function withoutId<Schema extends TObject>(schema: Schema) {
	return Omit(schema, ["id"]);
}
