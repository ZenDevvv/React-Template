import React from "react";
import type { CartItem } from "../../../types/cart";

interface CartItemRowProps {
	item: CartItem;
	onAdd: (id: string) => void;
	onSub: (id: string) => void;
	onRemove: (id: string) => void;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item, onAdd, onSub, onRemove }) => {
	return (
		<div className="bg-white rounded-2xl border shadow-sm p-6 sm:p-8 min-h-40 flex items-center gap-6">
			<div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
				<img src={item.image} alt={item.name} className="w-full h-full object-cover" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="mb-3">
					<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
						{item.name}
					</h3>
					<p className="text-gray-500 text-sm sm:text-base leading-relaxed">
						Tuna • Shrimp • Carrot • Mango • Jalapeno • Cucumber • Chili Flakes
					</p>
				</div>
				<div className="flex items-center justify-between">
					<div className="text-2xl sm:text-3xl font-bold text-gray-900">
						${item.price}
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center rounded-full border-2 border-gray-200 bg-white overflow-hidden">
							<button
								onClick={() => onSub(item.id)}
								className="w-11 h-11 grid place-items-center hover:bg-gray-50 transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="w-5 h-5 text-gray-600">
									<path
										fill="currentColor"
										d="M6 12c0-.55.45-1 1-1h10a1 1 0 1 1 0 2H7c-.55 0-1-.45-1-1Z"
									/>
								</svg>
							</button>
							<span className="px-4 text-lg font-semibold select-none min-w-[2rem] text-center">
								{item.qty}
							</span>
							<button
								onClick={() => onAdd(item.id)}
								className="w-11 h-11 grid place-items-center bg-blue-600 hover:bg-blue-700 text-white transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									className="w-5 h-5">
									<path
										fill="currentColor"
										d="M11 19v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0Z"
									/>
								</svg>
							</button>
						</div>
						<button
							onClick={() => onRemove(item.id)}
							className="text-red-400 hover:text-red-600 transition-colors"
							title="Remove">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="w-6 h-6">
								<path
									fill="currentColor"
									d="M7 7h10l-1 14H8L7 7Zm3-3h4l1 2h4a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2h4l1-2Z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItemRow;
