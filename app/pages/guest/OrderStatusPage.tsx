import React, { useState } from "react";
import { Clock, CheckCircle, Truck, Utensils, AlertCircle } from "lucide-react";
import { GuestPageTemplate } from "../../components/templates";
import type { Order, OrderStatus } from "../../types/cards";
import type { StatusOption } from "../../components/molecules/order-status/OrderStatusFilters";
import OrderStatusFilters from "../../components/molecules/order-status/OrderStatusFilters";
import { OrderStatusStats, OrderStatusList } from "../../components/organisms";

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

export const OrderStatusPage: React.FC = () => {
	const [orders] = useState<Order[]>(mockOrders);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

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

	const statusCounts = {
		all: orders.length,
		pending: orders.filter((o) => o.status === "pending").length,
		confirmed: orders.filter((o) => o.status === "confirmed").length,
		preparing: orders.filter((o) => o.status === "preparing").length,
		ready: orders.filter((o) => o.status === "ready").length,
		delivered: orders.filter((o) => o.status === "delivered").length,
		cancelled: orders.filter((o) => o.status === "cancelled").length,
	};

	const filterOptions: StatusOption[] = [
		{ value: "all", label: "All Status" },
		...Object.entries(statusConfig).map(([value, cfg]) => ({
			value: value as OrderStatus,
			label: cfg.label,
		})),
	];

	return (
		<GuestPageTemplate>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="mb-8">
						<h1 className="text-4xl font-bold text-slate-900 mb-2">Order Status</h1>
						<p className="text-slate-600">Track your food orders and delivery status</p>
					</div>

					<OrderStatusStats counts={statusCounts} />
					<OrderStatusFilters
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						statusFilter={statusFilter}
						onStatusChange={setStatusFilter}
						options={filterOptions}
					/>

					<OrderStatusList orders={filteredOrders} />

					<div className="mt-8 text-center">
						<a
							href="/dining"
							className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
							<span>Back to Menu</span>
						</a>
					</div>
				</div>
			</div>
		</GuestPageTemplate>
	);
};

export default OrderStatusPage;
