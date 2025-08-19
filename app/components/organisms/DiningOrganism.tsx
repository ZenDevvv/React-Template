import React, { useMemo } from "react";
import { Search, ShoppingBag, Clock } from "lucide-react";
import { MenuItemCard } from "../molecules";
import type { MenuItem } from "../../types/cards";

interface DiningOrganismProps {
	items: MenuItem[];
	cart: Record<string, number>;
	selectedCategory: string;
	searchQuery: string;
	onAddToCart: (id: string) => void;
	onRemoveFromCart: (id: string) => void;
	onCategoryChange: (category: string) => void;
	onSearchChange: (query: string) => void;
	totalItems: number;
}

export const DiningOrganism: React.FC<DiningOrganismProps> = ({
	items,
	cart,
	selectedCategory,
	searchQuery,
	onAddToCart,
	onRemoveFromCart,
	onCategoryChange,
	onSearchChange,
	totalItems,
}) => {
	console.log("DiningOrganism render - selectedCategory:", selectedCategory);
	const categories = [
		{ id: "salads", label: "Salads" },
		{ id: "mains", label: "Main Dishes" },
		{ id: "pasta", label: "Pasta" },
		{ id: "burgers", label: "Burgers" },
		{ id: "bowls", label: "Signature Bowls" },
		{ id: "desserts", label: "Desserts" },
		{ id: "drinks", label: "Beverages" },
	];

	const filteredItems = items.filter((item) => {
		const matchesCategory = item.category === selectedCategory;
		const matchesSearch =
			item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="flex">
			{/* Sidebar Organism */}
			<aside className="w-80 min-h-screen bg-gradient-to-br from-gray-50 to-white border-r border-slate-200 flex flex-col">
				<div className="p-6 border-b border-slate-100 flex-shrink-0">
					<h2 className="text-xl font-bold text-slate-900 whitespace-nowrap">
						Menu Categories
					</h2>
				</div>

				<nav className="flex-1 overflow-y-auto p-6">
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => onCategoryChange(category.id)}
							className={`w-full px-6 py-4 mb-2 rounded-2xl text-left transition-all duration-300 hover:bg-slate-50 hover:scale-105 ${
								selectedCategory === category.id
									? "border border-blue-600 text-blue-600 bg-blue-50"
									: "text-slate-700 hover:text-slate-900"
							}`}>
							<span className="font-medium text-base whitespace-nowrap">
								{category.label}
							</span>
						</button>
					))}
				</nav>
			</aside>

			{/* Main Content Organism */}
			<main className="flex-1 p-8 overflow-y-auto min-h-screen">
				{/* Header Section */}
				<header className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-2xl font-bold text-slate-900 mb-2">
							{categories.find((c) => c.id === selectedCategory)?.label}
						</h1>
						<p className="text-base text-slate-600">
							Fresh, delicious, and made with love
						</p>
					</div>

					{/* Search and Actions Section */}
					<div className="flex items-center space-x-6">
						<div className="relative">
							<input
								type="text"
								placeholder="Search dishes..."
								value={searchQuery}
								onChange={(e) => onSearchChange(e.target.value)}
								className="pl-12 pr-6 py-3 w-80 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
							/>
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
						</div>

						{/* Order Status Button */}
						<a
							href="/order-status"
							className="bg-white rounded-2xl p-4 border border-slate-200 hover:bg-slate-50 transition-all duration-300 relative group">
							<Clock className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
							{/* Tooltip */}
							<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
								Order Status
								<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
							</div>
						</a>

						{/* Cart Button */}
						<a
							href="/cart"
							className="bg-white rounded-2xl p-4 border border-slate-200 hover:bg-slate-50 transition-all duration-300 relative group">
							<div className="relative">
								<ShoppingBag className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
								{totalItems > 0 && (
									<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
										{totalItems}
									</span>
								)}
							</div>
							{/* Tooltip */}
							<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
								Cart ({totalItems} items)
								<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
							</div>
						</a>
					</div>
				</header>

				{/* Food Grid Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredItems.map((item) => (
						<MenuItemCard
							key={item.id}
							item={item}
							cartQuantity={cart[item.id] || 0}
							onAddToCart={onAddToCart}
							onRemoveFromCart={onRemoveFromCart}
						/>
					))}
				</div>

				{/* Empty State */}
				{filteredItems.length === 0 && (
					<div className="text-center py-16">
						<div className="text-6xl mb-4">🔍</div>
						<h3 className="text-2xl font-bold text-slate-900 mb-2">No items found</h3>
						<p className="text-slate-600">
							Try adjusting your search or browse other categories
						</p>
					</div>
				)}
			</main>
		</div>
	);
};

export default DiningOrganism;
