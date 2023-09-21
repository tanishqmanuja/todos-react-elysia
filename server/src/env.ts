import { object, coerce, string } from "zod";

const EnvSchema = object({
  PORT: coerce.number().default(8080),
  PUBLIC_DIR: string(),
});

export const env = EnvSchema.parse(process.env);
