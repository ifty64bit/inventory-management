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
import { useSignin } from "@/data/auth.api";
import { type SigninFormData, signinSchema } from "@/shared/schemas/auth";

export const Route = createFileRoute("/signin")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const signin = useSignin();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SigninFormData>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: SigninFormData) => {
		signin.mutate(
			{
				data: {
					email: data.email,
					password: data.password,
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
					<CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
					<CardDescription>
						Enter your credentials to access your account
					</CardDescription>
				</CardHeader>

				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent>
						<FieldGroup>
							{signin.isError && (
								<div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
									{signin.error.message}
								</div>
							)}

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
											disabled={signin.isPending}
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
											disabled={signin.isPending}
											autoComplete="current-password"
											{...field}
										/>
										{errors.password && (
											<FieldError>{errors.password.message}</FieldError>
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
							disabled={signin.isPending}
						>
							{signin.isPending ? "Signing in..." : "Sign In"}
						</Button>
						<p className="text-sm text-muted-foreground text-center">
							Don't have an account?{" "}
							<Link
								to="/signup"
								className="text-primary hover:underline font-medium"
							>
								Sign up
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</section>
	);
}
