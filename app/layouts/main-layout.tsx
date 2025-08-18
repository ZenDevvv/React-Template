import { Outlet } from "react-router";
import Header from "../components/molecules/Header";
import Navigation from "../components/molecules/Navigation";

export default function MainLayout() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
			<div className="flex-shrink-0">
				<Header />
			</div>
			<div className="flex-shrink-0">
				<Navigation />
			</div>
			<main className="flex-1 min-h-0">
				<Outlet />
			</main>
		</div>
	);
}
