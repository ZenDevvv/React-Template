import React, { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";

type CartItem = {
	id: string;
	name: string;
	price: number;
	image: string;
	qty: number;
};

export default function CartPage() {
	// Temporary local state; in real app, move to context or server
	const [items, setItems] = useState<CartItem[]>([]);

	// Load cart from localStorage on mount
	useEffect(() => {
		try {
			const raw = localStorage.getItem("cart_v1");
			if (raw) {
				const arr = JSON.parse(raw) as CartItem[];
				if (Array.isArray(arr)) setItems(arr);
			}
		} catch {}
	}, []);

	// Persist whenever items change
	useEffect(() => {
		try {
			localStorage.setItem("cart_v1", JSON.stringify(items));
		} catch {}
	}, [items]);

	const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
	const total = subtotal;

	const add = (id: string) =>
		setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
	const sub = (id: string) =>
		setItems((prev) =>
			prev.flatMap((i) =>
				i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i],
			),
		);
	const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

	if (items.length === 0) {
		return (
			<div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-orange-50">
				<div className="text-center space-y-4">
					<div className="mx-auto w-24 h-24 rounded-2xl bg-white shadow flex items-center justify-center text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-12 w-12"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m2-9l2 9m5-9v9m5-9l-2 9"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-bold">Your cart is empty</h1>
					<p className="text-gray-600">
						Add some delicious items from our menu to get started!
					</p>
					<a
						href="/dining"
						className="inline-block px-5 py-3 rounded-xl bg-orange-600 text-white hover:bg-orange-700">
						Browse Menu
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-slate-50 py-8">
			<div className="container mx-auto px-6 sm:px-8">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-3xl sm:text-4xl font-extrabold mb-6">Your Cart</h1>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-[auto_360px] gap-8 justify-center">
					<div className="space-y-4 w-full max-w-4xl">
						{items.map((i) => (
							<div
								key={i.id}
								className="bg-white rounded-2xl border shadow-sm p-6 sm:p-8 min-h-40 flex items-center gap-6">
								<div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
									<img
										src={i.image}
										alt={i.name}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex-1 min-w-0">
									{/* Title and description */}
									<div className="mb-3">
										<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
											{i.name}
										</h3>
										<p className="text-gray-500 text-sm sm:text-base leading-relaxed">
											Tuna • Shrimp • Carrot • Mango • Jalapeno • Cucumber •
											Chili Flakes
										</p>
									</div>
									{/* Price and controls row */}
									<div className="flex items-center justify-between">
										<div className="text-2xl sm:text-3xl font-bold text-gray-900">
											${i.price}
										</div>
										<div className="flex items-center gap-4">
											<div className="flex items-center rounded-full border-2 border-gray-200 bg-white overflow-hidden">
												<button
													onClick={() => sub(i.id)}
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
													{i.qty}
												</span>
												<button
													onClick={() => add(i.id)}
													className="w-11 h-11 grid place-items-center bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
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
												onClick={() => remove(i.id)}
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
						))}
					</div>
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
						<button className="w-full mt-4 h-12 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
							Proceed to Checkout
						</button>
						<div className="flex gap-2 mt-2">
							<a
								href="/order-status"
								className="flex-1 h-11 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 inline-grid place-items-center transition-colors relative group">
								<Clock className="w-5 h-5" />
								{/* Tooltip */}
								<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
									Order Status
									<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
								</div>
							</a>
							<a
								href="/dining"
								className="flex-1 h-11 rounded-lg bg-white border text-emerald-700 inline-grid place-items-center hover:bg-emerald-50 transition-colors">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
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
				</div>
			</div>
		</div>
	);
}
