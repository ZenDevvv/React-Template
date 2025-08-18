import React, { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

type MaintenanceStatus = "pending" | "in_progress" | "completed" | "cancelled";
type Priority = "low" | "medium" | "high" | "urgent";

type MaintenanceRequest = {
	id: string;
	room: string;
	title: string;
	description: string;
	category: string;
	priority: Priority;
	status: MaintenanceStatus;
	reportedBy: string;
	assignedTo?: string;
	createdAt: string;
	estimatedCompletion?: string;
};

const mockRequests: MaintenanceRequest[] = [
	{
		id: "M001",
		room: "103",
		title: "Air Conditioning Not Working",
		description: "AC unit not cooling properly, making strange noises",
		category: "HVAC",
		priority: "high",
		status: "in_progress",
		reportedBy: "Housekeeping",
		assignedTo: "John Tech",
		createdAt: "2024-12-13 09:30",
		estimatedCompletion: "2024-12-13 15:00",
	},
	{
		id: "M002",
		room: "205",
		title: "Bathroom Faucet Leaking",
		description: "Water continuously dripping from bathroom sink faucet",
		category: "Plumbing",
		priority: "medium",
		status: "pending",
		reportedBy: "Guest",
		createdAt: "2024-12-13 11:15",
	},
	{
		id: "M003",
		room: "107",
		title: "TV Not Turning On",
		description: "Television completely unresponsive, no power indicator",
		category: "Electronics",
		priority: "low",
		status: "pending",
		reportedBy: "Front Desk",
		createdAt: "2024-12-13 14:20",
	},
	{
		id: "M004",
		room: "301",
		title: "Broken Window Lock",
		description: "Window lock mechanism is damaged, security issue",
		category: "Security",
		priority: "urgent",
		status: "pending",
		reportedBy: "Security",
		createdAt: "2024-12-13 16:45",
	},
	{
		id: "M005",
		room: "102",
		title: "Light Bulb Replacement",
		description: "Multiple light bulbs burned out in bedroom",
		category: "Electrical",
		priority: "low",
		status: "completed",
		reportedBy: "Housekeeping",
		assignedTo: "Mike Electric",
		createdAt: "2024-12-12 10:00",
	},
];

const priorityConfig = {
	low: { color: "bg-green-100 text-green-800", label: "Low" },
	medium: { color: "bg-yellow-100 text-yellow-800", label: "Medium" },
	high: { color: "bg-orange-100 text-orange-800", label: "High" },
	urgent: { color: "bg-red-100 text-red-800", label: "Urgent" },
};

const statusConfig = {
	pending: { color: "bg-gray-100 text-gray-800", label: "Pending" },
	in_progress: { color: "bg-blue-100 text-blue-800", label: "In Progress" },
	completed: { color: "bg-green-100 text-green-800", label: "Completed" },
	cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
};

const RequestCard: React.FC<{ request: MaintenanceRequest; onClick: () => void }> = ({
	request,
	onClick,
}) => (
	<div
		onClick={onClick}
		className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
		<div className="flex items-start justify-between mb-3">
			<div>
				<h3 className="font-semibold text-gray-900">{request.title}</h3>
				<p className="text-sm text-gray-600">
					Room {request.room} • {request.category}
				</p>
			</div>
			<div className="flex flex-col items-end gap-2">
				<span
					className={`px-2 py-1 text-xs rounded-full ${priorityConfig[request.priority].color}`}>
					{priorityConfig[request.priority].label}
				</span>
				<span
					className={`px-2 py-1 text-xs rounded-full ${statusConfig[request.status].color}`}>
					{statusConfig[request.status].label}
				</span>
			</div>
		</div>

		<p className="text-sm text-gray-700 mb-3">{request.description}</p>

		<div className="flex items-center justify-between text-xs text-gray-500">
			<span>Reported by: {request.reportedBy}</span>
			<span>{request.createdAt}</span>
		</div>

		{request.assignedTo && (
			<div className="mt-2 text-xs text-blue-600">Assigned to: {request.assignedTo}</div>
		)}
	</div>
);

export const MaintenancePage: React.FC = () => {
	const [selectedStatus, setSelectedStatus] = useState<MaintenanceStatus | "all">("all");
	const [selectedPriority, setSelectedPriority] = useState<Priority | "all">("all");
	const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const filteredRequests = mockRequests.filter((request) => {
		if (selectedStatus !== "all" && request.status !== selectedStatus) return false;
		if (selectedPriority !== "all" && request.priority !== selectedPriority) return false;
		return true;
	});

	const statusCounts = {
		total: mockRequests.length,
		pending: mockRequests.filter((r) => r.status === "pending").length,
		in_progress: mockRequests.filter((r) => r.status === "in_progress").length,
		completed: mockRequests.filter((r) => r.status === "completed").length,
	};

	return (
		<AdminLayout
			title="Maintenance Management"
			subtitle="Track and manage all maintenance requests"
			actions={
				<button
					onClick={() => setShowCreateModal(true)}
					className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
					+ New Request
				</button>
			}>
			<div className="p-6">
				{/* Stats Overview */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-gray-900">{statusCounts.total}</div>
						<div className="text-sm text-gray-600">Total Requests</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-gray-600">
							{statusCounts.pending}
						</div>
						<div className="text-sm text-gray-600">Pending</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-blue-600">
							{statusCounts.in_progress}
						</div>
						<div className="text-sm text-gray-600">In Progress</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-green-600">
							{statusCounts.completed}
						</div>
						<div className="text-sm text-gray-600">Completed</div>
					</div>
				</div>

				{/* Filters */}
				<div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
					<div className="flex flex-wrap gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Status
							</label>
							<select
								value={selectedStatus}
								onChange={(e) =>
									setSelectedStatus(e.target.value as MaintenanceStatus | "all")
								}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
								<option value="all">All Status</option>
								<option value="pending">Pending</option>
								<option value="in_progress">In Progress</option>
								<option value="completed">Completed</option>
								<option value="cancelled">Cancelled</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Priority
							</label>
							<select
								value={selectedPriority}
								onChange={(e) =>
									setSelectedPriority(e.target.value as Priority | "all")
								}
								className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
								<option value="all">All Priorities</option>
								<option value="urgent">Urgent</option>
								<option value="high">High</option>
								<option value="medium">Medium</option>
								<option value="low">Low</option>
							</select>
						</div>
					</div>
				</div>

				{/* Requests Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredRequests.map((request) => (
						<RequestCard
							key={request.id}
							request={request}
							onClick={() => setSelectedRequest(request)}
						/>
					))}
				</div>
			</div>

			{/* Request Detail Modal */}
			{selectedRequest && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="p-6 border-b">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-xl font-bold">{selectedRequest.title}</h3>
									<p className="text-gray-600">
										Request ID: {selectedRequest.id}
									</p>
								</div>
								<button
									onClick={() => setSelectedRequest(null)}
									className="text-gray-400 hover:text-gray-600">
									<span className="text-2xl">×</span>
								</button>
							</div>
						</div>
						<div className="p-6 space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Room
									</label>
									<p className="text-gray-900 font-semibold">
										{selectedRequest.room}
									</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Category
									</label>
									<p className="text-gray-900">{selectedRequest.category}</p>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Description
								</label>
								<p className="text-gray-900">{selectedRequest.description}</p>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Priority
									</label>
									<span
										className={`inline-block px-3 py-1 text-sm rounded-full ${priorityConfig[selectedRequest.priority].color}`}>
										{priorityConfig[selectedRequest.priority].label}
									</span>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Status
									</label>
									<span
										className={`inline-block px-3 py-1 text-sm rounded-full ${statusConfig[selectedRequest.status].color}`}>
										{statusConfig[selectedRequest.status].label}
									</span>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Reported By
									</label>
									<p className="text-gray-900">{selectedRequest.reportedBy}</p>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Created
									</label>
									<p className="text-gray-900">{selectedRequest.createdAt}</p>
								</div>
							</div>

							{selectedRequest.assignedTo && (
								<div>
									<label className="block text-sm font-medium text-gray-700">
										Assigned To
									</label>
									<p className="text-gray-900">{selectedRequest.assignedTo}</p>
								</div>
							)}

							<div className="flex gap-2 pt-4">
								<button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
									Update Status
								</button>
								<button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
									Assign Technician
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default MaintenancePage;
