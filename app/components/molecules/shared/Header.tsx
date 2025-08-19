import React, { useState } from "react";
import { User, Settings, ChevronDown, LogOut, Bell, HelpCircle } from "lucide-react";
import { Text } from "../../ui/text";
import { IconButton } from "../../ui/icon-button";

export const Header: React.FC = () => {
	const currentTime = new Date();
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<header className="relative z-[60] flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 lg:py-5 bg-gradient-to-r from-white to-gray-50 shadow-sm border-b border-gray-100">
			{/* Logo */}
			<div className="flex flex-col">
				<Text as="h1" size="xl" weight="bold" className="text-blue-900 tracking-tight">
					Dusit
				</Text>
				<Text
					as="p"
					size="xs"
					variant="muted"
					className="uppercase tracking-widest font-medium hidden sm:block">
					INTERNATIONAL
				</Text>
			</div>

			{/* Right Side - Profile */}
			<div className="flex items-center space-x-3 sm:space-x-6">
				{/* Notifications */}
				<IconButton
					variant="ghost"
					size="default"
					icon={<Bell className="w-5 h-5 text-gray-600" />}
				/>

				{/* Profile Dropdown */}
				<div className="relative">
					<button
						onClick={() => setShowDropdown(!showDropdown)}
						className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
						<div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
							<User className="w-4 h-4 text-white" />
						</div>
						<ChevronDown className="w-4 h-4 text-gray-500" />
					</button>

					{/* Dropdown Menu */}
					{showDropdown && (
						<div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-[70]">
							<div className="px-4 py-3 border-b border-gray-100">
								<Text as="p" size="sm" weight="semibold" className="text-gray-900">
									John Doe
								</Text>
								<Text as="p" size="xs" variant="muted">
									Guest - Room 1205
								</Text>
							</div>

							<div className="py-2">
								<button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
									<Settings className="w-4 h-4 text-gray-500" />
									<Text as="span" size="sm" className="text-gray-700">
										Settings
									</Text>
								</button>
								<button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
									<HelpCircle className="w-4 h-4 text-gray-500" />
									<Text as="span" size="sm" className="text-gray-700">
										Help & Support
									</Text>
								</button>
								<button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors">
									<LogOut className="w-4 h-4 text-red-500" />
									<Text as="span" size="sm" className="text-red-600">
										Sign Out
									</Text>
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
