import React, { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

type FoodCategory = "appetizers" | "mains" | "desserts" | "beverages";
type DeviceType = "light" | "ac" | "door" | "food";

type Device = {
	id: string;
	name: string;
	type: DeviceType;
	category?: FoodCategory;
	price?: number;
	description?: string;
	image?: string;
	isAvailable: boolean;
	settings: Record<string, any>;
};

const mockDevices: Device[] = [
	{
		id: "1",
		name: "Bedroom Light",
		type: "light",
		isAvailable: true,
		settings: { brightness: 78, color: "warm", preset: "relax", scheduled: "10:30" },
	},
	{
		id: "2",
		name: "Living Room AC",
		type: "ac",
		isAvailable: true,
		settings: { temperature: 22, mode: "Fan Speed", preset: "Cool" },
	},
	{
		id: "3",
		name: "Door the Explorer",
		type: "door",
		isAvailable: true,
		settings: { status: "locked" },
	},
	{
		id: "4",
		name: "Grilled Chicken Caesar",
		type: "food",
		category: "mains",
		price: 28.99,
		description: "Fresh romaine lettuce, grilled chicken, parmesan cheese, croutons",
		image: "/api/placeholder/300/200",
		isAvailable: true,
		settings: {},
	},
	{
		id: "5",
		name: "Margherita Pizza",
		type: "food",
		category: "mains",
		price: 24.99,
		description: "Fresh mozzarella, tomato sauce, basil, olive oil",
		image: "/api/placeholder/300/200",
		isAvailable: true,
		settings: {},
	},
	{
		id: "6",
		name: "Chocolate Lava Cake",
		type: "food",
		category: "desserts",
		price: 12.99,
		description: "Warm chocolate cake with molten center, vanilla ice cream",
		image: "/api/placeholder/300/200",
		isAvailable: true,
		settings: {},
	},
];

const DeviceCard: React.FC<{
	device: Device;
	onEdit: (device: Device) => void;
	onDelete: (id: string) => void;
}> = ({ device, onEdit, onDelete }) => {
	const getDeviceIcon = () => {
		switch (device.type) {
			case "light":
				return (
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
					</svg>
				);
			case "ac":
				return (
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "door":
				return (
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 102 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z"
							clipRule="evenodd"
						/>
					</svg>
				);
			case "food":
				return (
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
						<path
							fillRule="evenodd"
							d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H8a1 1 0 01-1-1V6z"
							clipRule="evenodd"
						/>
					</svg>
				);
		}
	};

	const getStatusColor = () => {
		return device.isAvailable
			? "bg-green-100 text-green-800 border-green-200"
			: "bg-red-100 text-red-800 border-red-200";
	};

	return (
		<div className="bg-white rounded-lg border p-4 hover:shadow-sm transition-shadow">
			<div className="flex items-start justify-between mb-3">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
						{getDeviceIcon()}
					</div>
					<div>
						<h3 className="font-semibold text-gray-900">{device.name}</h3>
						<p className="text-sm text-gray-500 capitalize">{device.type}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor()}`}>
						{device.isAvailable ? "Available" : "Unavailable"}
					</span>
					<button
						onClick={() => onEdit(device)}
						className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
					</button>
					<button
						onClick={() => onDelete(device.id)}
						className="p-1 text-gray-400 hover:text-red-600 transition-colors">
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>
			</div>

			{device.type === "food" && (
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium text-gray-700">Price:</span>
						<span className="text-sm font-semibold text-emerald-600">
							${device.price}
						</span>
					</div>
					<p className="text-xs text-gray-600">{device.description}</p>
					{device.category && (
						<span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
							{device.category}
						</span>
					)}
				</div>
			)}

			{device.type !== "food" && Object.keys(device.settings).length > 0 && (
				<div className="space-y-1">
					{Object.entries(device.settings).map(([key, value]) => (
						<div key={key} className="flex items-center justify-between text-xs">
							<span className="text-gray-500 capitalize">{key}:</span>
							<span className="font-medium text-gray-700">{String(value)}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export const DevicesPage: React.FC = () => {
	const [devices, setDevices] = useState(mockDevices);
	const [selectedType, setSelectedType] = useState<DeviceType | "all">("all");
	const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const filteredDevices = devices.filter(
		(device) => selectedType === "all" || device.type === selectedType,
	);

	const handleEdit = (device: Device) => {
		setSelectedDevice(device);
	};

	const handleDelete = (id: string) => {
		setDevices(devices.filter((d) => d.id !== id));
	};

	const handleCreate = () => {
		setSelectedDevice(null);
		setShowCreateModal(true);
	};

	const deviceTypeCounts = {
		all: devices.length,
		light: devices.filter((d) => d.type === "light").length,
		ac: devices.filter((d) => d.type === "ac").length,
		door: devices.filter((d) => d.type === "door").length,
		food: devices.filter((d) => d.type === "food").length,
	};

	return (
		<AdminLayout
			title="Devices"
			subtitle="Manage and monitor your room devices"
			actions={
				<button
					onClick={handleCreate}
					className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
					+ Add Device
				</button>
			}>
			<div className="p-6">
				{/* Filter Tabs */}
				<div className="flex gap-2 mb-6">
					{(["all", "light", "ac", "door", "food"] as const).map((type) => (
						<button
							key={type}
							onClick={() => setSelectedType(type)}
							className={`px-4 py-2 rounded-lg font-medium transition-colors ${
								selectedType === type
									? "bg-emerald-100 text-emerald-700 border border-emerald-200"
									: "text-gray-600 hover:bg-gray-100"
							}`}>
							{type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}{" "}
							({deviceTypeCounts[type]})
						</button>
					))}
				</div>

				{/* Devices Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredDevices.map((device) => (
						<DeviceCard
							key={device.id}
							device={device}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					))}
				</div>

				{filteredDevices.length === 0 && (
					<div className="text-center py-12">
						<div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
							<svg
								className="w-8 h-8 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
						<p className="text-gray-500">Get started by adding your first device.</p>
					</div>
				)}
			</div>

			{/* Edit/Create Modal */}
			{(selectedDevice || showCreateModal) && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
						<div className="p-6 border-b">
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-semibold">
									{selectedDevice ? "Edit Device" : "Add New Device"}
								</h2>
								<button
									onClick={() => {
										setSelectedDevice(null);
										setShowCreateModal(false);
									}}
									className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div className="p-6">
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Device Name
									</label>
									<input
										type="text"
										defaultValue={selectedDevice?.name || ""}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
										placeholder="Enter device name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Device Type
									</label>
									<select
										defaultValue={selectedDevice?.type || "food"}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
										<option value="light">Light</option>
										<option value="ac">Air Conditioning</option>
										<option value="door">Door</option>
										<option value="food">Food Item</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Price (for food items)
									</label>
									<input
										type="number"
										step="0.01"
										defaultValue={selectedDevice?.price || ""}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
										placeholder="0.00"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Description
									</label>
									<textarea
										rows={3}
										defaultValue={selectedDevice?.description || ""}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
										placeholder="Enter description"
									/>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										defaultChecked={selectedDevice?.isAvailable ?? true}
										className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
									/>
									<label className="ml-2 text-sm text-gray-700">Available</label>
								</div>
							</div>
							<div className="flex justify-end gap-3 mt-6">
								<button
									onClick={() => {
										setSelectedDevice(null);
										setShowCreateModal(false);
									}}
									className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
									Cancel
								</button>
								<button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
									{selectedDevice ? "Update Device" : "Add Device"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default DevicesPage;
