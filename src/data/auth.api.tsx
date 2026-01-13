import { useMutation } from "@tanstack/react-query";
import { signin, signup } from "@/server/functions/auth";

export function useSignup() {
	return useMutation({
		mutationKey: ["signup"],
		mutationFn: signup,
	});
}

export function useSignin() {
	return useMutation({
		mutationKey: ["signin"],
		mutationFn: signin,
	});
}
