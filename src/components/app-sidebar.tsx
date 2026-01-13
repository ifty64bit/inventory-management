import { Link } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuItem,
} from "./ui/sidebar";

const navigations = [
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		name: "Items",
		href: "/items",
		icon: LayoutDashboard,
	},
];
function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<h1>Inventory Management</h1>
			</SidebarHeader>
			<SidebarContent>
				{navigations.map((item) => (
					<SidebarMenuItem key={item.name}>
						<Link
							to={item.href}
							className="flex items-center gap-2 px-1 py-1 rounded-md"
							activeProps={{ className: "bg-primary/10" }}
						>
							<item.icon /> {item.name}
						</Link>
					</SidebarMenuItem>
				))}
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}

export default AppSidebar;
