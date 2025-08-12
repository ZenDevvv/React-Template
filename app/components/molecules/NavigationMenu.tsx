import React from "react";
import { Home, Settings, Film, UtensilsCrossed, Calendar, Phone, LogOut } from "lucide-react";
import { NavLink } from "../ui/nav-link";
import { IconButton } from "../ui/icon-button";

export const NavigationMenu: React.FC = () => {
	const navItems = [
		{ icon: <Home className="w-6 h-6" />, label: "Home", to: "/home" },
		{ icon: <Settings className="w-6 h-6" />, label: "Controls", to: "/controls" },
		{ icon: <Film className="w-6 h-6" />, label: "Entertainment", to: "/entertainment" },
		{ icon: <UtensilsCrossed className="w-6 h-6" />, label: "Dining", to: "/dining" },
		{ icon: <Calendar className="w-6 h-6" />, label: "Reservations", to: "/reservations" },
		{ icon: <Phone className="w-6 h-6" />, label: "Operator", to: "/operator" },
		{ icon: <LogOut className="w-6 h-6" />, label: "Sign Out", to: "/signout" },
	];

	return (
		<nav className="inline-block px-6 py-3 bg-black/40 backdrop-blur-lg rounded-full border border-white/20 shadow-2xl">
			<div className="flex items-center space-x-3">
				{navItems.map((item, index) => (
					<NavLink
						key={index}
						to={item.to}
						label={item.label}
						icon={<IconButton variant="glass" size="lg" icon={item.icon} />}
						variant="glass"
					/>
				))}
			</div>
		</nav>
	);
};

export default NavigationMenu;
