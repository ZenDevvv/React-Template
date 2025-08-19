import React, { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

type RoomStatus = "cleaning" | "maintenance" | "inspection" | "ooo" | "ready";
type RequestStatus = "pending" | "in_progress" | "completed";

type Room = {
	number: string;
	status: RoomStatus;
	floor: number;
};

type SpecialRequest = {
	id: string;
	room: string;
	type: string;
	description: string;
	status: RequestStatus;
	timestamp: string;
};

const mockRooms: Room[] = [
	{ number: "101", status: "cleaning", floor: 1 },
	{ number: "102", status: "cleaning", floor: 1 },
	{ number: "103", status: "maintenance", floor: 1 },
	{ number: "104", status: "maintenance", floor: 1 },
	{ number: "105", status: "maintenance", floor: 1 },
	{ number: "106", status: "cleaning", floor: 1 },
	{ number: "107", status: "maintenance", floor: 1 },
	{ number: "108", status: "cleaning", floor: 1 },
	{ number: "109", status: "ooo", floor: 1 },
	{ number: "110", status: "inspection", floor: 1 },
];

const mockRequests: SpecialRequest[] = [
	{
		id: "1",
		room: "304",
		type: "Extra bed",
		description: "Room Setup",
		status: "pending",
		timestamp: "2 hours ago",
	},
	{
		id: "2",
		room: "512",
		type: "Welcome snacks",
		description: "Dining & Amenities",
		status: "in_progress",
		timestamp: "1 hour ago",
	},
	{
		id: "3",
		room: "205",
		type: "Extra towels",
		description: "Housekeeping Preferences",
		status: "completed",
		timestamp: "30 min ago",
	},
];

const statusColors: Record<RoomStatus, string> = {
	cleaning: "bg-blue-100 text-blue-800 border-blue-200",
	maintenance: "bg-orange-100 text-orange-800 border-orange-200",
	inspection: "bg-purple-100 text-purple-800 border-purple-200",
	ooo: "bg-red-100 text-red-800 border-red-200",
	ready: "bg-green-100 text-green-800 border-green-200",
};

const requestStatusColors: Record<RequestStatus, string> = {
	pending: "bg-yellow-100 text-yellow-800",
	in_progress: "bg-blue-100 text-blue-800",
	completed: "bg-green-100 text-green-800",
};

const RoomCard: React.FC<{ room: Room }> = ({ room }) => (
	<div
		className={`p-4 rounded-lg border-2 ${statusColors[room.status]} cursor-pointer hover:shadow-md transition-shadow`}>
		<div className="font-bold text-lg">{room.number}</div>
		<div className="text-sm capitalize">{room.status}</div>
	</div>
);

const RequestCard: React.FC<{ request: SpecialRequest }> = ({ request }) => (
	<div className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
		<div className="flex-1">
			<div className="flex items-center gap-3 mb-1">
				<span className="font-semibold">Room {request.room}</span>
				<span
					className={`px-2 py-1 rounded-full text-xs ${requestStatusColors[request.status]}`}>
					{request.status.replace("_", " ")}
				</span>
			</div>
			<div className="font-medium text-gray-900">{request.type}</div>
			<div className="text-sm text-gray-600">{request.description}</div>
		</div>
		<div className="text-sm text-gray-500">{request.timestamp}</div>
	</div>
);

export const DashboardPage: React.FC = () => {
	const [selectedFloor, setSelectedFloor] = useState(1);

	const stats = {
		cleaning: mockRooms.filter((r) => r.status === "cleaning").length,
		maintenance: mockRooms.filter((r) => r.status === "maintenance").length,
		inspection: mockRooms.filter((r) => r.status === "inspection").length,
		ooo: mockRooms.filter((r) => r.status === "ooo").length,
	};

	const floorRooms = mockRooms.filter((room) => room.floor === selectedFloor);

	return (
		<AdminLayout
			title="Guest Dashboard"
			subtitle="HMS - Guest Room Management"
			actions={
				<>
					<select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
						<option>Guest Room Management</option>
					</select>
					<div className="w-8 h-8 bg-gray-300 rounded-full"></div>
				</>
			}>
			<div className="p-6">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Stats and Room Status */}
					<div className="lg:col-span-2 space-y-6">
						{/* Stats Cards */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="bg-white p-4 rounded-lg shadow-sm border">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
										<div className="w-4 h-4 bg-blue-600 rounded"></div>
									</div>
									<div>
										<div className="text-2xl font-bold">{stats.cleaning}</div>
										<div className="text-sm text-gray-600">Cleaning</div>
									</div>
								</div>
							</div>

							<div className="bg-white p-4 rounded-lg shadow-sm border">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
										<div className="w-4 h-4 bg-orange-600 rounded"></div>
									</div>
									<div>
										<div className="text-2xl font-bold">
											{stats.maintenance}
										</div>
										<div className="text-sm text-gray-600">Maintenance</div>
									</div>
								</div>
							</div>

							<div className="bg-white p-4 rounded-lg shadow-sm border">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
										<div className="w-4 h-4 bg-purple-600 rounded"></div>
									</div>
									<div>
										<div className="text-2xl font-bold">{stats.inspection}</div>
										<div className="text-sm text-gray-600">Inspection</div>
									</div>
								</div>
							</div>

							<div className="bg-white p-4 rounded-lg shadow-sm border">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
										<div className="w-4 h-4 bg-red-600 rounded"></div>
									</div>
									<div>
										<div className="text-2xl font-bold">{stats.ooo}</div>
										<div className="text-sm text-gray-600">OOO</div>
									</div>
								</div>
							</div>
						</div>

						{/* Room Status */}
						<div className="bg-white rounded-lg shadow-sm border">
							<div className="p-6 border-b">
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-semibold">Room Status</h2>
									<select
										value={selectedFloor}
										onChange={(e) => setSelectedFloor(Number(e.target.value))}
										className="px-3 py-2 border border-gray-300 rounded-lg">
										<option value={1}>Floor 1</option>
										<option value={2}>Floor 2</option>
										<option value={3}>Floor 3</option>
									</select>
								</div>
							</div>
							<div className="p-6">
								<div className="grid grid-cols-5 gap-4">
									{floorRooms.map((room) => (
										<RoomCard key={room.number} room={room} />
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Special Requests */}
					<div className="bg-white rounded-lg shadow-sm border h-fit">
						<div className="p-6 border-b">
							<h2 className="text-xl font-semibold">Special Requests</h2>
							<div className="flex items-center gap-4 mt-2 text-sm">
								<span>Room</span>
								<span>Request</span>
								<span>Status</span>
							</div>
						</div>
						<div className="p-6 space-y-4">
							{mockRequests.map((request) => (
								<RequestCard key={request.id} request={request} />
							))}
						</div>
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

export default DashboardPage;
