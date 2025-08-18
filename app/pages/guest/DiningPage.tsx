import React, { useEffect, useMemo, useState } from "react";
import { Search, ShoppingBag, Plus, Minus, Star, Clock, Leaf } from "lucide-react";
import { truncateText } from "../../lib/utils";

type Category = {
	id: string;
	icon: React.ReactNode;
	label: string;
};

type MenuItem = {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
	category: string;
	rating: number;
	prepTime: string;
	isVegan?: boolean;
	isPopular?: boolean;
};

const categories: Category[] = [
	{ id: "salads", icon: null, label: "Salads" },
	{ id: "mains", icon: null, label: "Main Dishes" },
	{ id: "pasta", icon: null, label: "Pasta" },
	{ id: "burgers", icon: null, label: "Burgers" },
	{ id: "bowls", icon: null, label: "Signature Bowls" },
	{ id: "desserts", icon: null, label: "Desserts" },
	{ id: "drinks", icon: null, label: "Beverages" },
];

const items: MenuItem[] = [
	{
		id: "dyn",
		name: "Dynamite Bowl",
		price: 20,
		description:
			"Tuna • Shrimp • Carrot • Mango • Jalapeno • Cucumber • Chili Flakes • Sesame Seeds",
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1796&auto=format&fit=crop",
		category: "bowls",
		rating: 4.8,
		prepTime: "15-20 min",
		isPopular: true,
	},
	{
		id: "duke",
		name: "The Duke Bowl",
		price: 16,
		description:
			"Tuna • Salmon • Shrimp • Seaweed • Edamame • Cucumber • Jalapeno • Sweet Onion",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "bowls",
		rating: 4.6,
		prepTime: "12-18 min",
		isVegan: true,
	},
	{
		id: "volcano",
		name: "Volcano Bowl",
		price: 12,
		description:
			"Spicy Salmon • Spicy Tuna • Green Onion • Cabbage • Cucumber • Carrot • Jalapeno • Ginger",
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1796&auto=format&fit=crop",
		category: "bowls",
		rating: 4.9,
		prepTime: "10-15 min",
	},
	{
		id: "salmon",
		name: "Salmon Bowl",
		price: 15,
		description:
			"Spicy Salmon • Green Onion • Avocado • Cucumber • Ginger • House Sauce with light sriracha",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "bowls",
		rating: 4.7,
		prepTime: "8-12 min",
	},
	// Adding some additional sample items for other categories
	{
		id: "mediterranean-salad",
		name: "Mediterranean Salad",
		price: 14,
		description:
			"Mixed Greens • Cherry Tomatoes • Cucumber • Olives • Feta • Red Onion • Olive Oil Dressing",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "salads",
		rating: 4.5,
		prepTime: "5-10 min",
		isVegan: true,
	},
	{
		id: "truffle-pasta",
		name: "Truffle Pasta",
		price: 24,
		description: "Fresh Linguine • Truffle Oil • Mushrooms • Parmesan • Garlic • Fresh Herbs",
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1796&auto=format&fit=crop",
		category: "pasta",
		rating: 4.7,
		prepTime: "18-25 min",
	},
	{
		id: "classic-burger",
		name: "Classic Burger",
		price: 18,
		description:
			"Angus Beef Patty • Lettuce • Tomato • Red Onion • Pickles • Special Sauce • Brioche Bun",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "burgers",
		rating: 4.4,
		prepTime: "12-18 min",
		isPopular: true,
	},
];

export const DiningPage: React.FC = () => {
	// cart state: id -> quantity
	const [cart, setCart] = useState<Record<string, number>>({});
	const [selectedCategory, setSelectedCategory] = useState("bowls");
	const [searchQuery, setSearchQuery] = useState("");
	// No drawer; we'll navigate to /cart and persist to localStorage

	const itemById = useMemo(() => {
		const map: Record<string, MenuItem> = {};
		for (const i of items) map[i.id] = i;
		return map;
	}, []);

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			const matchesCategory = item.category === selectedCategory;
			const matchesSearch =
				item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		});
	}, [selectedCategory, searchQuery]);

	const add = (id: string) => {
		setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
	};

	const sub = (id: string) => {
		setCart((prev) => {
			const qty = (prev[id] || 0) - 1;
			if (qty <= 0) {
				const { [id]: _, ...rest } = prev;
				return rest;
			}
			return { ...prev, [id]: qty };
		});
	};

	const totalItems = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

	const totalAmount = useMemo(() => {
		let sum = 0;
		for (const [id, qty] of Object.entries(cart)) {
			const item = itemById[id];
			if (item) sum += item.price * qty;
		}
		return sum;
	}, [cart, itemById]);

	const cartItems = useMemo(() => {
		return Object.entries(cart)
			.map(([id, qty]) => {
				const item = itemById[id];
				if (!item) return null;
				return { ...item, qty } as MenuItem & { qty: number };
			})
			.filter(Boolean) as Array<MenuItem & { qty: number }>;
	}, [cart, itemById]);

	// Persist cart as a compact object and a detailed array for the CartPage
	useEffect(() => {
		try {
			// restore on first mount
			const raw = localStorage.getItem("cart_v1");
			if (raw) {
				const arr = JSON.parse(raw) as Array<{ id: string; qty: number }>;
				const obj: Record<string, number> = {};
				for (const it of arr) obj[it.id] = it.qty;
				setCart((prev) => (Object.keys(prev).length ? prev : obj));
			}
		} catch {}
	}, []);

	useEffect(() => {
		try {
			const detailed = cartItems.map((ci) => ({
				id: ci.id,
				name: ci.name,
				price: ci.price,
				image: ci.image,
				qty: (cart as any)[ci.id] || 0,
			}));
			localStorage.setItem("cart_v1", JSON.stringify(detailed));
		} catch {}
	}, [cartItems, cart]);
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			<div className="flex">
				{/* Sidebar */}
				<aside className="w-80 min-h-screen bg-white border-r border-slate-200 shadow-xl flex flex-col">
					<div className="p-8 border-b border-slate-100 flex-shrink-0">
						<h2 className="text-2xl font-bold text-slate-900 mb-2">Menu Categories</h2>
						<p className="text-slate-600">Discover our delicious offerings</p>
					</div>

					<nav className="flex-1 overflow-y-auto p-6">
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`w-full px-6 py-4 mb-2 rounded-2xl text-left transition-all duration-300 hover:bg-slate-50 hover:scale-105 ${
									selectedCategory === category.id
										? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
										: "text-slate-700 hover:text-slate-900"
								}`}>
								<span className="font-medium">{category.label}</span>
							</button>
						))}
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-8 overflow-y-auto min-h-screen">
					{/* Header */}
					<header className="flex items-center justify-between mb-8">
						<div>
							<h1 className="text-4xl font-bold text-slate-900 mb-2">
								{categories.find((c) => c.id === selectedCategory)?.label}
							</h1>
							<p className="text-slate-600">Fresh, delicious, and made with love</p>
						</div>

						{/* Search and Cart Summary */}
						<div className="flex items-center space-x-6">
							<div className="relative">
								<input
									type="text"
									placeholder="Search dishes..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-12 pr-6 py-3 w-80 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
								/>
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
							</div>

							{/* Order Status Button */}
							<a
								href="/order-status"
								className="bg-white rounded-2xl shadow-lg p-4 border border-slate-200 hover:shadow-xl transition-all duration-300 relative group">
								<Clock className="w-6 h-6 text-slate-700 group-hover:text-emerald-600 transition-colors" />
								{/* Tooltip */}
								<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
									Order Status
									<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
								</div>
							</a>

							{/* Cart Button */}
							<a
								href="/cart"
								className="bg-white rounded-2xl shadow-lg p-4 border border-slate-200 hover:shadow-xl transition-all duration-300 relative group">
								<div className="relative">
									<ShoppingBag className="w-6 h-6 text-slate-700 group-hover:text-emerald-600 transition-colors" />
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

					{/* Food Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredItems.map((item) => {
							const cartItem = cart[item.id];

							return (
								<div
									key={item.id}
									className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col h-full">
									<div className="relative">
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-56 object-cover"
										/>
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

									<div className="p-6 flex-1 flex flex-col">
										<div className="flex items-start justify-between mb-3">
											<h3 className="text-xl font-bold text-slate-900">
												{item.name}
											</h3>
											<span className="text-2xl font-bold text-emerald-600">
												${item.price}
											</span>
										</div>

										<div className="flex items-center space-x-4 mb-4">
											<div className="flex items-center space-x-1">
												<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
												<span className="text-sm font-medium text-slate-700">
													{item.rating}
												</span>
											</div>
											<div className="flex items-center space-x-1">
												<Clock className="w-4 h-4 text-slate-500" />
												<span className="text-sm text-slate-600">
													{item.prepTime}
												</span>
											</div>
										</div>

										<p className="text-slate-600 text-sm mb-6 leading-relaxed h-12 overflow-hidden">
											{truncateText(item.description, 85)}
										</p>

										{cartItem ? (
											<div className="flex items-center justify-between mt-auto">
												<div className="flex items-center space-x-3 bg-slate-100 rounded-2xl p-2">
													<button
														onClick={() => sub(item.id)}
														className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform active:scale-95">
														<Minus className="w-4 h-4" />
													</button>
													<span className="w-8 text-center font-medium">
														{cartItem}
													</span>
													<button
														onClick={() => add(item.id)}
														className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform active:scale-95">
														<Plus className="w-4 h-4" />
													</button>
												</div>
												<span className="font-bold text-emerald-600">
													${(item.price * cartItem).toFixed(2)}
												</span>
											</div>
										) : (
											<button
												onClick={() => add(item.id)}
												className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform active:scale-95 mt-auto">
												<Plus className="w-4 h-4" />
												<span>Add to Cart</span>
											</button>
										)}
									</div>
								</div>
							);
						})}
					</div>

					{filteredItems.length === 0 && (
						<div className="text-center py-16">
							<div className="text-6xl mb-4">🔍</div>
							<h3 className="text-2xl font-bold text-slate-900 mb-2">
								No items found
							</h3>
							<p className="text-slate-600">
								Try adjusting your search or browse other categories
							</p>
						</div>
					)}
				</main>
			</div>
		</div>
	);
};

export default DiningPage;
