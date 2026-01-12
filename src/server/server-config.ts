import { getEnv } from "./env";

export const serverConfig = {
	DATABASE_URL: getEnv("DATABASE_URL"),
};
