import React, { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

type RoomStatus = "available" | "occupied" | "cleaning" | "maintenance" | "ooo";
type GuestRoom = {
	number: string;
	floor: number;
	type: string;
	status: RoomStatus;
	guest?: string;
	checkIn?: string;
	checkOut?: string;
	lastCleaned?: string;
};

const mockRooms: GuestRoom[] = [
	{
		number: "101",
		floor: 1,
		type: "Standard",
		status: "occupied",
		guest: "John Smith",
		checkIn: "Dec 12",
		checkOut: "Dec 15",
	},
	{ number: "102", floor: 1, type: "Standard", status: "cleaning", lastCleaned: "2 hours ago" },
	{ number: "103", floor: 1, type: "Deluxe", status: "available" },
	{ number: "104", floor: 1, type: "Standard", status: "maintenance" },
	{
		number: "105",
		floor: 1,
		type: "Suite",
		status: "occupied",
		guest: "Jane Doe",
		checkIn: "Dec 10",
		checkOut: "Dec 14",
	},
	{ number: "106", floor: 1, type: "Standard", status: "available" },
	{ number: "107", floor: 1, type: "Deluxe", status: "ooo" },
	{ number: "108", floor: 1, type: "Standard", status: "cleaning", lastCleaned: "1 hour ago" },
	{
		number: "201",
		floor: 2,
		type: "Suite",
		status: "occupied",
		guest: "Bob Wilson",
		checkIn: "Dec 11",
		checkOut: "Dec 16",
	},
	{ number: "202", floor: 2, type: "Standard", status: "available" },
	{
		number: "203",
		floor: 2,
		type: "Deluxe",
		status: "occupied",
		guest: "Alice Brown",
		checkIn: "Dec 13",
		checkOut: "Dec 17",
	},
	{ number: "204", floor: 2, type: "Standard", status: "cleaning", lastCleaned: "30 min ago" },
];

const statusConfig = {
	available: { color: "bg-green-100 text-green-800 border-green-200", label: "Available" },
	occupied: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Occupied" },
	cleaning: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Cleaning" },
	maintenance: { color: "bg-orange-100 text-orange-800 border-orange-200", label: "Maintenance" },
	ooo: { color: "bg-red-100 text-red-800 border-red-200", label: "Out of Order" },
};

const RoomCard: React.FC<{ room: GuestRoom; onClick: () => void }> = ({ room, onClick }) => {
	const config = statusConfig[room.status];

	return (
		<div
			onClick={onClick}
			className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
			<div className="flex items-start justify-between mb-3">
				<div>
					<h3 className="text-xl font-bold">{room.number}</h3>
					<p className="text-sm text-gray-600">{room.type}</p>
				</div>
				<span className={`px-3 py-1 text-xs font-medium rounded-full ${config.color}`}>
					{config.label}
				</span>
			</div>

			{room.status === "occupied" && room.guest && (
				<div className="space-y-1">
					<p className="font-medium text-gray-900">{room.guest}</p>
					<p className="text-sm text-gray-600">Check-in: {room.checkIn}</p>
					<p className="text-sm text-gray-600">Check-out: {room.checkOut}</p>
				</div>
			)}

			{room.status === "cleaning" && room.lastCleaned && (
				<p className="text-sm text-gray-600">Last cleaned: {room.lastCleaned}</p>
			)}

			{room.status === "available" && (
				<p className="text-sm text-gray-600">Ready for booking</p>
			)}

			{room.status === "maintenance" && (
				<p className="text-sm text-orange-600">Under maintenance</p>
			)}

			{room.status === "ooo" && <p className="text-sm text-red-600">Out of service</p>}
		</div>
	);
};

export const RoomsPage: React.FC = () => {
	const [selectedFloor, setSelectedFloor] = useState<number | "all">("all");
	const [selectedStatus, setSelectedStatus] = useState<RoomStatus | "all">("all");
	const [selectedRoom, setSelectedRoom] = useState<GuestRoom | null>(null);

	const filteredRooms = mockRooms.filter((room) => {
		if (selectedFloor !== "all" && room.floor !== selectedFloor) return false;
		if (selectedStatus !== "all" && room.status !== selectedStatus) return false;
		return true;
	});

	const statusCounts = {
		total: mockRooms.length,
		available: mockRooms.filter((r) => r.status === "available").length,
		occupied: mockRooms.filter((r) => r.status === "occupied").length,
		cleaning: mockRooms.filter((r) => r.status === "cleaning").length,
		maintenance: mockRooms.filter((r) => r.status === "maintenance").length,
		ooo: mockRooms.filter((r) => r.status === "ooo").length,
	};

	return (
		<AdminLayout title="Room Management" subtitle="Manage all guest rooms and their status">
			<div className="p-6">
				{/* Stats Overview */}
				<div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
						<div className="text-sm text-gray-600">Total Rooms</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-green-600">
							{statusCounts.available}
						</div>
						<div className="text-sm text-gray-600">Available</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-blue-600">
							{statusCounts.occupied}
						</div>
						<div className="text-sm text-gray-600">Occupied</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-yellow-600">
							{statusCounts.cleaning}
						</div>
						<div className="text-sm text-gray-600">Cleaning</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-orange-600">
							{statusCounts.maintenance}
						</div>
						<div className="text-sm text-gray-600">Maintenance</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-red-600">{statusCounts.ooo}</div>
						<div className="text-sm text-gray-600">Out of Order</div>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
					<div className="flex flex-wrap gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Floor
							</label>
							<select
								value={selectedFloor}
								onChange={(e) =>
									setSelectedFloor(
										e.target.value === "all" ? "all" : Number(e.target.value),
									)
								}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
								<option value="all">All Floors</option>
								<option value={1}>Floor 1</option>
								<option value={2}>Floor 2</option>
								<option value={3}>Floor 3</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Status
							</label>
							<select
								value={selectedStatus}
								onChange={(e) =>
									setSelectedStatus(e.target.value as RoomStatus | "all")
								}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
								<option value="all">All Status</option>
								<option value="available">Available</option>
								<option value="occupied">Occupied</option>
								<option value="cleaning">Cleaning</option>
								<option value="maintenance">Maintenance</option>
								<option value="ooo">Out of Order</option>
							</select>
						</div>
					</div>
				</div>

				{/* Rooms Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{filteredRooms.map((room) => (
						<RoomCard
							key={room.number}
							room={room}
							onClick={() => setSelectedRoom(room)}
						/>
					))}
				</div>
			</div>

			{/* Room Detail Modal */}
			{selectedRoom && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
						<div className="p-6 border-b">
							<div className="flex items-center justify-between">
								<h3 className="text-xl font-bold">Room {selectedRoom.number}</h3>
								<button
									onClick={() => setSelectedRoom(null)}
									className="text-gray-400 hover:text-gray-600">
									<span className="text-2xl">×</span>
								</button>
							</div>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Type
								</label>
								<p className="text-gray-900">{selectedRoom.type}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Floor
								</label>
								<p className="text-gray-900">Floor {selectedRoom.floor}</p>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Status
								</label>
								<span
									className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusConfig[selectedRoom.status].color}`}>
									{statusConfig[selectedRoom.status].label}
								</span>
							</div>
							{selectedRoom.guest && (
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Guest
									</label>
									<p className="text-gray-900">{selectedRoom.guest}</p>
								</div>
							)}
							<div className="flex gap-2 pt-4">
								<button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
									Update Status
								</button>
								<button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
									View Details
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default RoomsPage;
