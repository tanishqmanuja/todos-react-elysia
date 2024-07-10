import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { api } from "./api";
import { isProd } from "./env";
import { logger } from "./lib/logger";
import { pluginConditionally } from "./utils/elysia";

export const app = new Elysia()
	.use(cors())
	.use(swagger())
	.use(pluginConditionally(!isProd, logger))
	.use(api);
