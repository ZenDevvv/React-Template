import React from "react";
import { Home, Settings, Film, UtensilsCrossed, Calendar, Phone } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Text } from "../ui/text";

interface NavItemProps {
	icon: React.ReactNode;
	label: string;
	to: string;
	isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isActive = false }) => (
	<Link
		to={to}
		className="flex flex-col items-center space-y-1 md:space-y-2 lg:space-y-3 cursor-pointer group transition-all duration-200 min-w-0 flex-shrink-0 max-w-[70px] md:max-w-none">
		<div
			className={`p-1.5 md:p-3 lg:p-4 rounded-lg md:rounded-xl transition-all duration-200 ${
				isActive
					? "text-blue-600 bg-blue-50 shadow-sm"
					: "text-gray-500 hover:text-blue-600 hover:bg-blue-50/50"
			}`}>
			{React.cloneElement(icon as React.ReactElement<any>, {
				className: "w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7",
			})}
		</div>
		<Text
			as="span"
			size="xs"
			weight={isActive ? "semibold" : "medium"}
			className={`transition-colors text-center leading-tight text-[9px] md:text-sm ${
				isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"
			}`}>
			{label}
		</Text>
		{isActive && (
			<div className="w-3 md:w-6 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
		)}
	</Link>
);

export const Navigation: React.FC = () => {
	const location = useLocation();

	const navItems = [
		{ icon: <Home />, label: "Home", to: "/home" },
		{ icon: <Settings />, label: "Controls", to: "/controls" },
		{ icon: <Film />, label: "Entertainment", to: "/entertainment" },
		{ icon: <UtensilsCrossed />, label: "Dining", to: "/dining" },
		{ icon: <Calendar />, label: "Reservations", to: "/reservations" },
		{ icon: <Phone />, label: "Services", to: "/operator" },
	];

	return (
		<nav className="flex items-center justify-between px-2 md:justify-center md:space-x-8 lg:space-x-40 py-4 md:py-6 lg:py-8 bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-200 overflow-x-auto">
			{navItems.map((item, index) => (
				<NavItem key={index} {...item} isActive={location.pathname === item.to} />
			))}
		</nav>
	);
};

export default Navigation;
