import { drizzle } from "drizzle-orm/node-postgres";
import { serverConfig } from "../server-config.ts";
import * as schema from "./schema.ts";

export const db = drizzle(serverConfig.DATABASE_URL, { schema });
