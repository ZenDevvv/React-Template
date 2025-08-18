import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, Truck, Utensils, AlertCircle, Search, Filter } from "lucide-react";

type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";

type OrderItem = {
	id: string;
	name: string;
	quantity: number;
	price: number;
};

type Order = {
	id: string;
	orderNumber: string;
	items: OrderItem[];
	total: number;
	status: OrderStatus;
	orderTime: string;
	estimatedDelivery: string;
	actualDelivery?: string;
	roomNumber?: string;
	notes?: string;
};

const mockOrders: Order[] = [
	{
		id: "1",
		orderNumber: "ORD-2024-001",
		items: [
			{ id: "dyn", name: "Dynamite Bowl", quantity: 2, price: 20 },
			{ id: "duke", name: "The Duke Bowl", quantity: 1, price: 16 },
		],
		total: 56,
		status: "delivered",
		orderTime: "2024-12-15T14:30:00Z",
		estimatedDelivery: "2024-12-15T15:00:00Z",
		actualDelivery: "2024-12-15T14:55:00Z",
		roomNumber: "304",
		notes: "Extra spicy please",
	},
	{
		id: "2",
		orderNumber: "ORD-2024-002",
		items: [
			{ id: "volcano", name: "Volcano Bowl", quantity: 1, price: 12 },
			{ id: "salmon", name: "Salmon Bowl", quantity: 1, price: 15 },
		],
		total: 27,
		status: "ready",
		orderTime: "2024-12-15T15:15:00Z",
		estimatedDelivery: "2024-12-15T15:45:00Z",
		roomNumber: "512",
	},
	{
		id: "3",
		orderNumber: "ORD-2024-003",
		items: [{ id: "mediterranean-salad", name: "Mediterranean Salad", quantity: 1, price: 14 }],
		total: 14,
		status: "preparing",
		orderTime: "2024-12-15T15:30:00Z",
		estimatedDelivery: "2024-12-15T15:50:00Z",
		roomNumber: "205",
		notes: "No onions",
	},
	{
		id: "4",
		orderNumber: "ORD-2024-004",
		items: [{ id: "truffle-pasta", name: "Truffle Pasta", quantity: 1, price: 24 }],
		total: 24,
		status: "confirmed",
		orderTime: "2024-12-15T15:45:00Z",
		estimatedDelivery: "2024-12-15T16:15:00Z",
		roomNumber: "108",
	},
];

const statusConfig: Record<
	OrderStatus,
	{
		label: string;
		color: string;
		icon: React.ReactNode;
		description: string;
	}
> = {
	pending: {
		label: "Pending",
		color: "bg-yellow-100 text-yellow-800 border-yellow-200",
		icon: <Clock className="w-4 h-4" />,
		description: "Order received, waiting for confirmation",
	},
	confirmed: {
		label: "Confirmed",
		color: "bg-blue-100 text-blue-800 border-blue-200",
		icon: <CheckCircle className="w-4 h-4" />,
		description: "Order confirmed, starting preparation",
	},
	preparing: {
		label: "Preparing",
		color: "bg-orange-100 text-orange-800 border-orange-200",
		icon: <Utensils className="w-4 h-4" />,
		description: "Chef is preparing your order",
	},
	ready: {
		label: "Ready",
		color: "bg-green-100 text-green-800 border-green-200",
		icon: <Truck className="w-4 h-4" />,
		description: "Order is ready for delivery",
	},
	delivered: {
		label: "Delivered",
		color: "bg-emerald-100 text-emerald-800 border-emerald-200",
		icon: <CheckCircle className="w-4 h-4" />,
		description: "Order has been delivered",
	},
	cancelled: {
		label: "Cancelled",
		color: "bg-red-100 text-red-800 border-red-200",
		icon: <AlertCircle className="w-4 h-4" />,
		description: "Order has been cancelled",
	},
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
	const status = statusConfig[order.status];
	const orderDate = new Date(order.orderTime);
	const estimatedDate = new Date(order.estimatedDelivery);
	const actualDate = order.actualDelivery ? new Date(order.actualDelivery) : null;

	return (
		<div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<div>
					<h3 className="text-lg font-bold text-slate-900">{order.orderNumber}</h3>
					<p className="text-sm text-slate-600">
						{orderDate.toLocaleDateString()} at{" "}
						{orderDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
					</p>
				</div>
				<div
					className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${status.color}`}>
					{status.icon}
					<span className="text-sm font-medium">{status.label}</span>
				</div>
			</div>

			{/* Items */}
			<div className="mb-4">
				<h4 className="font-medium text-slate-900 mb-2">Order Items:</h4>
				<div className="space-y-1">
					{order.items.map((item) => (
						<div key={item.id} className="flex justify-between text-sm">
							<span className="text-slate-700">
								{item.quantity}x {item.name}
							</span>
							<span className="text-slate-900 font-medium">
								${(item.price * item.quantity).toFixed(2)}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Status Description */}
			<div className="mb-4">
				<p className="text-sm text-slate-600">{status.description}</p>
			</div>

			{/* Timing */}
			<div className="mb-4">
				<div className="flex justify-between text-sm">
					<span className="text-slate-600">Estimated Delivery:</span>
					<span className="text-slate-900 font-medium">
						{estimatedDate.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</span>
				</div>
				{actualDate && (
					<div className="flex justify-between text-sm mt-1">
						<span className="text-slate-600">Actual Delivery:</span>
						<span className="text-emerald-600 font-medium">
							{actualDate.toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</span>
					</div>
				)}
			</div>

			{/* Room and Notes */}
			<div className="flex justify-between items-start">
				{order.roomNumber && (
					<div className="text-sm">
						<span className="text-slate-600">Room: </span>
						<span className="text-slate-900 font-medium">{order.roomNumber}</span>
					</div>
				)}
				<div className="text-right">
					<div className="text-lg font-bold text-slate-900">
						${order.total.toFixed(2)}
					</div>
				</div>
			</div>

			{/* Notes */}
			{order.notes && (
				<div className="mt-3 p-3 bg-slate-50 rounded-lg">
					<p className="text-sm text-slate-700">
						<strong>Notes:</strong> {order.notes}
					</p>
				</div>
			)}
		</div>
	);
};

export const OrderStatusPage: React.FC = () => {
	const [orders, setOrders] = useState<Order[]>(mockOrders);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

	// Filter orders based on search and status
	const filteredOrders = orders.filter((order) => {
		const matchesSearch =
			order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.items.some((item) =>
				item.name.toLowerCase().includes(searchQuery.toLowerCase()),
			) ||
			(order.roomNumber && order.roomNumber.includes(searchQuery));

		const matchesStatus = statusFilter === "all" || order.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

	// Get status counts
	const statusCounts = {
		all: orders.length,
		pending: orders.filter((o) => o.status === "pending").length,
		confirmed: orders.filter((o) => o.status === "confirmed").length,
		preparing: orders.filter((o) => o.status === "preparing").length,
		ready: orders.filter((o) => o.status === "ready").length,
		delivered: orders.filter((o) => o.status === "delivered").length,
		cancelled: orders.filter((o) => o.status === "cancelled").length,
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			<div className="max-w-7xl mx-auto px-6 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-slate-900 mb-2">Order Status</h1>
					<p className="text-slate-600">Track your food orders and delivery status</p>
				</div>

				{/* Stats Overview */}
				<div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
					{Object.entries(statusCounts).map(([status, count]) => (
						<div
							key={status}
							className="bg-white p-4 rounded-xl shadow-sm border text-center">
							<div className="text-2xl font-bold text-slate-900">{count}</div>
							<div className="text-sm text-slate-600 capitalize">
								{status === "all" ? "Total Orders" : status}
							</div>
						</div>
					))}
				</div>

				{/* Filters */}
				<div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
					<div className="flex flex-col md:flex-row gap-4">
						{/* Search */}
						<div className="flex-1 relative">
							<input
								type="text"
								placeholder="Search by order number, items, or room..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
							/>
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
						</div>

						{/* Status Filter */}
						<div className="flex items-center space-x-2">
							<Filter className="w-5 h-5 text-slate-400" />
							<select
								value={statusFilter}
								onChange={(e) =>
									setStatusFilter(e.target.value as OrderStatus | "all")
								}
								className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300">
								<option value="all">All Status</option>
								{Object.entries(statusConfig).map(([status, config]) => (
									<option key={status} value={status}>
										{config.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Orders Grid */}
				{filteredOrders.length > 0 ? (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{filteredOrders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<div className="text-6xl mb-4">📋</div>
						<h3 className="text-2xl font-bold text-slate-900 mb-2">No orders found</h3>
						<p className="text-slate-600">Try adjusting your search or status filter</p>
					</div>
				)}

				{/* Back to Dining Button */}
				<div className="mt-8 text-center">
					<a
						href="/dining"
						className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
						<span>Back to Menu</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default OrderStatusPage;
