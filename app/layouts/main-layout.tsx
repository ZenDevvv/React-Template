import { Outlet, useLocation } from "react-router";
import Header from "../components/molecules/shared/Header";
import Navigation from "../components/molecules/shared/Navigation";

export default function MainLayout() {
	const location = useLocation();
	const isWelcomePage = location.pathname === "/";

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
			{!isWelcomePage && (
				<div className="flex-shrink-0 relative z-[60]">
					<Header />
				</div>
			)}
			{!isWelcomePage && (
				<div className="flex-shrink-0 relative z-40">
					<Navigation />
				</div>
			)}
			<main className="flex-1 min-h-0">
				<Outlet />
			</main>
		</div>
	);
}
