import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { logger } from "@tqman/nice-logger";
import { Elysia } from "elysia";

import { api } from "./api";

export const app = new Elysia()
	.use(cors())
	.use(swagger())
	.use(logger())
	.use(api);
