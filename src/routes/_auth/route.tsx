import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { authMiddleware } from "@/shared/middleware/auth-middleware";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
	server: {
		middleware: [authMiddleware],
	},
});

function RouteComponent() {
	const { data: session, isPending } = authClient.useSession();

	if (!isPending && !session) {
		return <Navigate to="/signin" />;
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
