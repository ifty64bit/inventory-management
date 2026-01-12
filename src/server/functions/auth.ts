import { createServerFn } from "@tanstack/react-start";
import { userSchema } from "@/shared/schemas/auth";
import { auth } from "../lib/auth";

export const signup = createServerFn({
	method: "GET",
})
	.inputValidator(userSchema)
	.handler(async ({ data }) => {
		const res = await auth.api.signUpEmail({
			body: {
				email: data.email,
				password: data.password,
				name: data.name,
				username: data.username,
			},
			asResponse: true,
		});

		if (!res.ok) {
			let errorMessage = "Signup failed";
			try {
				const error = await res.json();
				errorMessage = error.message || errorMessage;
			} catch {
				// ignore json parse error
			}
			throw new Error(errorMessage);
		}

		return { success: true };
	});
