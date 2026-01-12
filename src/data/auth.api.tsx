import { useMutation } from "@tanstack/react-query";
import { signup } from "@/server/functions/auth";

export function useSignup() {
	return useMutation({
		mutationKey: ["signup"],
		mutationFn: signup,
	});
}
