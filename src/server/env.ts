import { createServerOnlyFn } from "@tanstack/react-start";

export const DATABASE_URL = createServerOnlyFn(() => process.env.DATABASE_URL);
