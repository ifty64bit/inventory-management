import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/data/auth.api";
import { type SignupFormData, signupSchema } from "@/shared/schemas/auth";

export const Route = createFileRoute("/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const signup = useSignup();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: SignupFormData) => {
		signup.mutate(
			{
				data: {
					email: data.email,
					password: data.password,
					name: data.name,
					username: data.username,
				},
			},
			{
				onSuccess: () => {
					navigate({ to: "/" });
				},
			},
		);
	};

	return (
		<section className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/30 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-2xl font-bold">Create Account</CardTitle>
					<CardDescription>
						Enter your details to create a new account
					</CardDescription>
				</CardHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent>
						<FieldGroup>
							{signup.isError && (
								<div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
									{signup.error.message}
								</div>
							)}

							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<Field data-invalid={!!errors.name}>
										<FieldLabel htmlFor="name">Name</FieldLabel>
										<Input
											id="name"
											type="text"
											placeholder="John Doe"
											disabled={signup.isPending}
											autoComplete="name"
											{...field}
										/>
										{errors.name && (
											<FieldError>{errors.name.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								name="username"
								control={control}
								render={({ field }) => (
									<Field data-invalid={!!errors.username}>
										<FieldLabel htmlFor="username">Username</FieldLabel>
										<Input
											id="username"
											type="text"
											placeholder="johndoe"
											disabled={signup.isPending}
											autoComplete="username"
											{...field}
										/>
										{errors.username && (
											<FieldError>{errors.username.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Field data-invalid={!!errors.email}>
										<FieldLabel htmlFor="email">Email</FieldLabel>
										<Input
											id="email"
											type="email"
											placeholder="john@example.com"
											disabled={signup.isPending}
											autoComplete="email"
											{...field}
										/>
										{errors.email && (
											<FieldError>{errors.email.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<Field data-invalid={!!errors.password}>
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Input
											id="password"
											type="password"
											placeholder="••••••••"
											disabled={signup.isPending}
											autoComplete="new-password"
											{...field}
										/>
										{errors.password && (
											<FieldError>{errors.password.message}</FieldError>
										)}
									</Field>
								)}
							/>

							<Controller
								name="confirmPassword"
								control={control}
								render={({ field }) => (
									<Field data-invalid={!!errors.confirmPassword}>
										<FieldLabel htmlFor="confirmPassword">
											Confirm Password
										</FieldLabel>
										<Input
											id="confirmPassword"
											type="password"
											placeholder="••••••••"
											disabled={signup.isPending}
											autoComplete="new-password"
											{...field}
										/>
										{errors.confirmPassword && (
											<FieldError>{errors.confirmPassword.message}</FieldError>
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</CardContent>

					<CardFooter className="flex flex-col gap-4 mt-4">
						<Button
							type="submit"
							className="w-full"
							disabled={signup.isPending}
						>
							{signup.isPending ? "Creating Account..." : "Sign Up"}
						</Button>
						<p className="text-sm text-muted-foreground text-center">
							Already have an account?{" "}
							<Link to="/" className="text-primary hover:underline font-medium">
								Sign in
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</section>
	);
}
