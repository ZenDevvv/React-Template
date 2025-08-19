import React from "react";
import { Search, Filter } from "lucide-react";
import type { OrderStatus } from "../../../types/cards";

export type StatusOption = { value: OrderStatus | "all"; label: string };

interface OrderStatusFiltersProps {
	searchQuery: string;
	onSearchChange: (v: string) => void;
	statusFilter: OrderStatus | "all";
	onStatusChange: (v: OrderStatus | "all") => void;
	options: StatusOption[];
}

const OrderStatusFilters: React.FC<OrderStatusFiltersProps> = ({
	searchQuery,
	onSearchChange,
	statusFilter,
	onStatusChange,
	options,
}) => {
	return (
		<div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex-1 relative">
					<input
						type="text"
						placeholder="Search by order number, items, or room..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
					/>
					<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
				</div>

				<div className="flex items-center space-x-2">
					<Filter className="w-5 h-5 text-slate-400" />
					<select
						value={statusFilter}
						onChange={(e) => onStatusChange(e.target.value as OrderStatus | "all")}
						className="px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300">
						{options.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default OrderStatusFilters;
