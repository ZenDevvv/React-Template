import React from "react";
import { Clock, CheckCircle, Truck, Utensils, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { Order, OrderStatus } from "../../../types/cards";

interface OrderCardProps {
	order: Order;
	className?: string;
}

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

export const OrderCard: React.FC<OrderCardProps> = ({ order, className = "" }) => {
	const status = statusConfig[order.status];
	const orderDate = new Date(order.orderTime);
	const estimatedDate = new Date(order.estimatedDelivery);
	const actualDate = order.actualDelivery ? new Date(order.actualDelivery) : null;

	return (
		<Card className={`hover:shadow-xl transition-shadow ${className}`}>
			<CardContent>
				{/* Header */}
				<CardHeader className="p-0 mb-4">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-lg text-slate-900">
								{order.orderNumber}
							</CardTitle>
							<p className="text-sm text-slate-600">
								{orderDate.toLocaleDateString()} at{" "}
								{orderDate.toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</p>
						</div>
						<div
							className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${status.color}`}>
							{status.icon}
							<span className="text-sm font-medium">{status.label}</span>
						</div>
					</div>
				</CardHeader>

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
			</CardContent>
		</Card>
	);
};

export default OrderCard;
