import React from "react";
import { OrderCard } from "../molecules";
import type { Order } from "../../types/cards";

interface OrderStatusListProps {
	orders: Order[];
}

const OrderStatusList: React.FC<OrderStatusListProps> = ({ orders }) => {
	if (orders.length === 0) {
		return (
			<div className="text-center py-16">
				<div className="text-6xl mb-4">📋</div>
				<h3 className="text-2xl font-bold text-slate-900 mb-2">No orders found</h3>
				<p className="text-slate-600">Try adjusting your search or status filter</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{orders.map((order) => (
				<OrderCard key={order.id} order={order} />
			))}
		</div>
	);
};

export default OrderStatusList;
