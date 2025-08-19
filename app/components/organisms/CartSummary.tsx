import React from "react";
import { Clock } from "lucide-react";

interface CartSummaryProps {
	subtotal: number;
	total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, total }) => {
	return (
		<aside className="bg-white rounded-xl shadow-sm border p-4 h-fit sticky top-4">
			<h3 className="text-xl font-bold mb-3">Order Summary</h3>
			<div className="space-y-2 text-sm">
				<div className="flex items-center justify-between">
					<span className="text-gray-600">Subtotal</span>
					<span className="font-medium">${subtotal.toFixed(2)}</span>
				</div>
			</div>
			<hr className="my-3" />
			<div className="flex items-center justify-between text-lg font-bold">
				<span>Total</span>
				<span>${total.toFixed(2)}</span>
			</div>
			<button className="w-full mt-4 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium">
				Proceed to Checkout
			</button>
			<div className="flex gap-2 mt-2">
				<a
					href="/order-status"
					className="flex-1 h-11 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 inline-grid place-items-center transition-colors relative group">
					<Clock className="w-5 h-5" />
					<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
						Order Status
						<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
					</div>
				</a>
				<a
					href="/dining"
					className="flex-1 h-11 rounded-lg bg-white border text-blue-700 inline-grid place-items-center hover:bg-blue-50 transition-colors">
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
				</a>
			</div>
		</aside>
	);
};

export default CartSummary;
