import React from "react";
import CartItemRow from "../molecules/cart/CartItemRow";
import type { CartItem } from "../../types/cart";

interface CartListProps {
	items: CartItem[];
	onAdd: (id: string) => void;
	onSub: (id: string) => void;
	onRemove: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({ items, onAdd, onSub, onRemove }) => {
	return (
		<div className="space-y-4 w-full max-w-4xl">
			{items.map((i) => (
				<CartItemRow key={i.id} item={i} onAdd={onAdd} onSub={onSub} onRemove={onRemove} />
			))}
		</div>
	);
};

export default CartList;
