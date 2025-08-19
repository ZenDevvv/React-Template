import React from "react";
import { Link, useLocation } from "react-router";

interface AdminLayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle: string;
	actions?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle, actions }) => {
	const location = useLocation();

	const navigationItems = [
		{
			name: "Dashboard",
			href: "/admin/dashboard",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
					/>
				</svg>
			),
		},
		{
			name: "Devices",
			href: "/admin/devices",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
					/>
				</svg>
			),
		},
		{
			name: "Dining",
			href: "/admin/dining",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H8a1 1 0 01-1-1V6z"
					/>
				</svg>
			),
		},
		{
			name: "Rooms",
			href: "/admin/rooms",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
					/>
				</svg>
			),
		},
		{
			name: "Guests",
			href: "/admin/guests",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			),
		},
		{
			name: "Maintenance",
			href: "/admin/maintenance",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
		},
		{
			name: "Reservations",
			href: "/admin/reservations",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			),
		},
		{
			name: "Settings",
			href: "/admin/settings",
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
		},
	];

	const isActiveRoute = (href: string) => {
		return location.pathname === href;
	};

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
				{/* Logo/Header */}
				<div className="p-6 border-b border-gray-200">
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
							<svg
								className="w-5 h-5 text-white"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
							</svg>
						</div>
						<div>
							<h1 className="text-lg font-bold text-gray-900">GRMS</h1>
							<p className="text-xs text-gray-500">Admin Portal</p>
						</div>
					</div>
				</div>

				{/* Navigation */}
				<nav className="flex-1 p-4">
					<ul className="space-y-2">
						{navigationItems.map((item) => (
							<li key={item.name}>
								<Link
									to={item.href}
									className={`
										flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
										${
											isActiveRoute(item.href)
												? "bg-emerald-100 text-emerald-700 border border-emerald-200"
												: "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
										}
									`}>
									{item.icon}
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* User Profile */}
				<div className="p-4 border-t border-gray-200">
					<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
						<div className="w-8 h-8 bg-gray-300 rounded-full"></div>
						<div className="flex-1">
							<div className="text-sm font-medium text-gray-900">Admin User</div>
							<div className="text-xs text-gray-500">admin@hotel.com</div>
						</div>
						<svg
							className="w-4 h-4 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<div className="bg-white shadow-sm border-b">
					<div className="px-6 py-4">
						<div className="flex items-center justify-between">
							<div>
								<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
								<p className="text-gray-600">{subtitle}</p>
							</div>
							{actions && <div className="flex items-center gap-4">{actions}</div>}
						</div>
					</div>
				</div>

				{/* Page Content */}
				<div className="flex-1 overflow-auto">{children}</div>
			</div>
		</div>
	);
};

export default AdminLayout;
