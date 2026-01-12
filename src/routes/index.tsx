import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<section className="w-full h-screen flex flex-col gap-4 items-center justify-center">
			<h1 className="text-4xl font-bold">Dynamic Inventory Management</h1>
			<div className="flex gap-4">
				<Link to="/signin">
					<Button>Sign In</Button>
				</Link>
				<Link to="/signup">
					<Button>Sign Up</Button>
				</Link>
			</div>
		</section>
	);
}
