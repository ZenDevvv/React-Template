import React from "react";

interface OrderStatusStatsProps {
	counts: Record<string, number>;
}

const OrderStatusStats: React.FC<OrderStatusStatsProps> = ({ counts }) => {
	return (
		<div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
			{Object.entries(counts).map(([status, count]) => (
				<div key={status} className="bg-white p-4 rounded-xl shadow-sm border text-center">
					<div className="text-2xl font-bold text-slate-900">{count}</div>
					<div className="text-sm text-slate-600 capitalize">
						{status === "all" ? "Total Orders" : status}
					</div>
				</div>
			))}
		</div>
	);
};

export default OrderStatusStats;
