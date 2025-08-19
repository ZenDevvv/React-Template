import React from "react";
import { Home, Settings, Film, UtensilsCrossed, Calendar, Phone, LogOut } from "lucide-react";
import { IconButton } from "../../ui/icon-button";
import { Link, useNavigate } from "react-router";

export const NavigationMenu: React.FC = () => {
	const navigate = useNavigate();
	const navItems = [
		{ icon: <Home className="w-6 h-6" />, label: "Home", to: "/home" },
		{ icon: <Settings className="w-6 h-6" />, label: "Controls", to: "/controls" },
		{ icon: <Film className="w-6 h-6" />, label: "Entertainment", to: "/entertainment" },
		{ icon: <UtensilsCrossed className="w-6 h-6" />, label: "Dining", to: "/dining" },
		{ icon: <Calendar className="w-6 h-6" />, label: "Reservations", to: "/reservations" },
		{ icon: <Phone className="w-6 h-6" />, label: "Operator", to: "/operator" },
		{ icon: <LogOut className="w-6 h-6" />, label: "Sign Out", to: "/signout" },
	];

	const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
		if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
		e.preventDefault();
		const href = (e.currentTarget.getAttribute("href") as string) || "/";
		navigate(href);
	};

	return (
		<nav className="inline-block px-6 py-3 bg-black/40 backdrop-blur-lg rounded-full border border-white/20 shadow-2xl">
			<div className="flex items-center space-x-3">
				{navItems.map((item, index) => (
					<Link
						key={index}
						to={item.to}
						onClick={handleClick}
						className="inline-flex flex-col items-center">
						<IconButton variant="glass" size="lg" icon={item.icon} />
						<span className="text-xs text-white/90">{item.label}</span>
					</Link>
				))}
			</div>
		</nav>
	);
};

export default NavigationMenu;
