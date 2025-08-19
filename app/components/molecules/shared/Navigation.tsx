import React from "react";
import { Home, Settings, Film, UtensilsCrossed, Calendar, Phone, LogOut } from "lucide-react";
import { useLocation } from "react-router";
import { Text } from "../../ui/text";

interface NavItemProps {
	icon: React.ReactNode;
	label: string;
	to: string;
	isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isActive = false }) => {
	const handleClick = (e: React.MouseEvent) => {
		console.log("Navigation clicked:", to);
		// Let the default behavior happen
	};

	return (
		<a
			href={to}
			onClick={handleClick}
			className={`text-center ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}>
			<div
				className={`p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 rounded-lg md:rounded-xl transition-all duration-200 ${
					isActive
						? "bg-blue-50 shadow-lg shadow-blue-200/50 border border-blue-200"
						: "hover:bg-gray-50"
				}`}>
				{React.cloneElement(icon as React.ReactElement<any>, {
					className: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10",
				})}
			</div>
			<Text
				as="span"
				size="sm"
				weight={isActive ? "semibold" : "medium"}
				className="transition-colors text-center leading-tight text-[10px] sm:text-[11px] md:text-[12px] lg:text-sm">
				{label}
			</Text>
			{isActive && (
				<div className="w-2 sm:w-3 md:w-4 lg:w-5 xl:w-6 h-0.5 sm:h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
			)}
		</a>
	);
};

export const Navigation: React.FC = () => {
	const location = useLocation();

	const navItems = [
		{ icon: <Home />, label: "Home", to: "/home" },
		{ icon: <Settings />, label: "Controls", to: "/controls" },
		{ icon: <Film />, label: "Entertainment", to: "/entertainment" },
		{ icon: <UtensilsCrossed />, label: "Dining", to: "/dining" },
		{ icon: <Calendar />, label: "Reservations", to: "/reservations" },
		{ icon: <Phone />, label: "Operator", to: "/operator" },
	];

	return (
		<nav className="relative pointer-events-auto flex items-center justify-between px-2 sm:px-4 md:justify-center md:space-x-6 lg:space-x-16 xl:space-x-24 py-4 md:py-5 lg:py-6 bg-gradient-to-b from-white to-gray-50/50 border-b border-gray-200 overflow-x-auto">
			{navItems.map((item, index) => (
				<NavItem key={index} {...item} isActive={location.pathname === item.to} />
			))}
		</nav>
	);
};

export default Navigation;
