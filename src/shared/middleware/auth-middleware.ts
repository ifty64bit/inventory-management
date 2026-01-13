import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { auth } from "@/server/lib/auth";

export const createAuthMiddleware = () =>
	createMiddleware().server(async ({ next, request }) => {
		const session = await auth.api.getSession({ headers: request.headers });

		if (!session) {
			throw redirect({ to: "/signin" });
		}

		// if (session.user.emailVerified === false) {
		// 	throw redirect({ to: "/get-approval" });
		// }

		// if (options.requireAdmin && !session.user.isAdmin) {
		// 	throw redirect({ to: "/feed" }); // Or throw an error
		// }

		return await next({
			context: {
				userId: Number(session.user.id),
			},
		});
	});

// Pre-configured middlewares for convenience
export const authMiddleware = createAuthMiddleware();
