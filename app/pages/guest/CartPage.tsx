import React, { useEffect, useMemo, useState } from "react";
import type { CartItem } from "../../types/cart";
import { CartList, CartSummary } from "../../components/organisms";

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
					<CartList items={items} onAdd={add} onSub={sub} onRemove={remove} />
					<CartSummary subtotal={subtotal} total={total} />
				</div>
			</div>
		</div>
	);
}
