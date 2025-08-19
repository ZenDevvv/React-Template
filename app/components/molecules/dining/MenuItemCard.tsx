import React from "react";
import { Star, Clock, Leaf, Plus, Minus } from "lucide-react";
import { truncateText } from "../../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { MenuItem } from "../../../types/cards";

interface MenuItemCardProps {
	item: MenuItem;
	cartQuantity?: number;
	onAddToCart: (id: string) => void;
	onRemoveFromCart: (id: string) => void;
	className?: string;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
	item,
	cartQuantity = 0,
	onAddToCart,
	onRemoveFromCart,
	className = "",
}) => {
	return (
		<Card
			className={`overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full ${className}`}>
			<div className="relative">
				<img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
				<div className="absolute top-4 right-4 flex space-x-2">
					{item.isPopular && (
						<span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
							Popular
						</span>
					)}
					{item.isVegan && (
						<span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
							<Leaf className="w-3 h-3 mr-1" />
							Vegan
						</span>
					)}
				</div>
			</div>

			<CardContent className="flex-1 flex flex-col">
				<CardHeader className="p-0 mb-3">
					<div className="flex items-start justify-between">
						<CardTitle className="text-xl text-slate-900">{item.name}</CardTitle>
						<span className="text-2xl font-bold text-blue-600">${item.price}</span>
					</div>
				</CardHeader>

				<div className="flex items-center space-x-4 mb-4">
					<div className="flex items-center space-x-1">
						<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
						<span className="text-sm font-medium text-slate-700">{item.rating}</span>
					</div>
					<div className="flex items-center space-x-1">
						<Clock className="w-4 h-4 text-slate-500" />
						<span className="text-sm text-slate-600">{item.prepTime}</span>
					</div>
				</div>

				<p className="text-slate-600 text-sm mb-6 leading-relaxed h-12 overflow-hidden">
					{truncateText(item.description, 85)}
				</p>

				{cartQuantity > 0 ? (
					<div className="flex items-center justify-between mt-auto">
						<div className="flex items-center space-x-3 bg-slate-100 rounded-2xl p-2">
							<button
								onClick={() => onRemoveFromCart(item.id)}
								className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform active:scale-95">
								<Minus className="w-4 h-4" />
							</button>
							<span className="w-8 text-center font-medium">{cartQuantity}</span>
							<button
								onClick={() => onAddToCart(item.id)}
								className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform active:scale-95">
								<Plus className="w-4 h-4" />
							</button>
						</div>
						<span className="font-bold text-blue-600">
							${(item.price * cartQuantity).toFixed(2)}
						</span>
					</div>
				) : (
					<button
						onClick={() => onAddToCart(item.id)}
						className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform active:scale-95 mt-auto">
						<Plus className="w-4 h-4" />
						<span>Add to Cart</span>
					</button>
				)}
			</CardContent>
		</Card>
	);
};

export default MenuItemCard;
