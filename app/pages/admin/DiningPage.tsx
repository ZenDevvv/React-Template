import React, { useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

type FoodCategory = "appetizers" | "mains" | "desserts" | "beverages";

type FoodItem = {
	id: string;
	name: string;
	category: FoodCategory;
	price: number;
	description: string;
	image: string;
	isAvailable: boolean;
	preparationTime?: number; // minutes
	ingredients?: string[];
	allergens?: string[];
};

const mockFoodItems: FoodItem[] = [
	{
		id: "1",
		name: "Grilled Chicken Caesar",
		category: "mains",
		price: 28.99,
		description: "Fresh romaine lettuce, grilled chicken, parmesan cheese, croutons",
		image: "/api/placeholder/300/200",
		isAvailable: true,
		preparationTime: 15,
		ingredients: [
			"chicken breast",
			"romaine lettuce",
			"parmesan cheese",
			"croutons",
			"caesar dressing",
		],
		allergens: ["dairy", "gluten"],
	},
	{
		id: "2",
		name: "Margherita Pizza",
		category: "mains",
		price: 24.99,
		description: "Fresh mozzarella, tomato sauce, basil, olive oil",
		image: "/api/placeholder/300/200",
		isAvailable: true,
		preparationTime: 20,
		ingredients: ["pizza dough", "mozzarella", "tomato sauce", "fresh basil", "olive oil"],
		allergens: ["gluten", "dairy"],
	},
	{
		id: "3",
		name: "Chocolate Lava Cake",
		category: "desserts",
		price: 12.99,
		description: "Warm chocolate cake with molten center, vanilla ice cream",
		image: "/api/placeholder/300/200",
		isAvailable: true,
		preparationTime: 10,
		ingredients: ["dark chocolate", "butter", "eggs", "flour", "vanilla ice cream"],
		allergens: ["eggs", "dairy", "gluten"],
	},
	{
		id: "4",
		name: "Truffle Arancini",
		category: "appetizers",
		price: 16.99,
		description: "Crispy risotto balls with truffle oil and parmesan",
		image: "/api/placeholder/300/200",
		isAvailable: true,
		preparationTime: 12,
		ingredients: ["arborio rice", "truffle oil", "parmesan", "breadcrumbs"],
		allergens: ["dairy", "gluten"],
	},
	{
		id: "5",
		name: "Fresh Lemonade",
		category: "beverages",
		price: 6.99,
		description: "Freshly squeezed lemons, mint, sparkling water",
		image: "/api/placeholder/300/200",
		isAvailable: true,
		preparationTime: 3,
		ingredients: ["fresh lemons", "mint", "sparkling water", "sugar"],
		allergens: [],
	},
];

const FoodItemCard: React.FC<{
	item: FoodItem;
	onEdit: (item: FoodItem) => void;
	onDelete: (id: string) => void;
	onToggleAvailability: (id: string) => void;
}> = ({ item, onEdit, onDelete, onToggleAvailability }) => {
	const getCategoryColor = (category: FoodCategory) => {
		switch (category) {
			case "appetizers":
				return "bg-orange-100 text-orange-800";
			case "mains":
				return "bg-blue-100 text-blue-800";
			case "desserts":
				return "bg-pink-100 text-pink-800";
			case "beverages":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="bg-white rounded-lg border shadow-sm overflow-hidden">
			<div className="aspect-video bg-gray-100 relative">
				<img src={item.image} alt={item.name} className="w-full h-full object-cover" />
				<div className="absolute top-3 right-3 flex gap-2">
					<span
						className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
						{item.category}
					</span>
					<button
						onClick={() => onToggleAvailability(item.id)}
						className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
							item.isAvailable
								? "bg-green-100 text-green-800 hover:bg-green-200"
								: "bg-red-100 text-red-800 hover:bg-red-200"
						}`}>
						{item.isAvailable ? "Available" : "Unavailable"}
					</button>
				</div>
			</div>

			<div className="p-4">
				<div className="flex items-start justify-between mb-2">
					<h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
					<span className="text-xl font-bold text-emerald-600">${item.price}</span>
				</div>

				<p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

				<div className="flex items-center justify-between text-xs text-gray-500 mb-4">
					<span>⏱️ {item.preparationTime} min</span>
					{item.allergens && item.allergens.length > 0 && (
						<span>⚠️ {item.allergens.join(", ")}</span>
					)}
				</div>

				<div className="flex gap-2">
					<button
						onClick={() => onEdit(item)}
						className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
						Edit
					</button>
					<button
						onClick={() => onDelete(item.id)}
						className="px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export const DiningPage: React.FC = () => {
	const [foodItems, setFoodItems] = useState(mockFoodItems);
	const [selectedCategory, setSelectedCategory] = useState<FoodCategory | "all">("all");
	const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const filteredItems = foodItems.filter(
		(item) => selectedCategory === "all" || item.category === selectedCategory,
	);

	const handleEdit = (item: FoodItem) => {
		setSelectedItem(item);
	};

	const handleDelete = (id: string) => {
		setFoodItems(foodItems.filter((item) => item.id !== id));
	};

	const handleToggleAvailability = (id: string) => {
		setFoodItems(
			foodItems.map((item) =>
				item.id === id ? { ...item, isAvailable: !item.isAvailable } : item,
			),
		);
	};

	const handleCreate = () => {
		setSelectedItem(null);
		setShowCreateModal(true);
	};

	const categoryCounts = {
		all: foodItems.length,
		appetizers: foodItems.filter((item) => item.category === "appetizers").length,
		mains: foodItems.filter((item) => item.category === "mains").length,
		desserts: foodItems.filter((item) => item.category === "desserts").length,
		beverages: foodItems.filter((item) => item.category === "beverages").length,
	};

	const availableCount = foodItems.filter((item) => item.isAvailable).length;
	const unavailableCount = foodItems.filter((item) => !item.isAvailable).length;

	return (
		<AdminLayout
			title="Dining Configuration"
			subtitle="Manage food menu and dining options"
			actions={
				<button
					onClick={handleCreate}
					className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
					+ Add Food Item
				</button>
			}>
			<div className="p-6">
				{/* Stats Cards */}
				<div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-gray-900">{foodItems.length}</div>
						<div className="text-sm text-gray-600">Total Items</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-green-600">{availableCount}</div>
						<div className="text-sm text-gray-600">Available</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-red-600">{unavailableCount}</div>
						<div className="text-sm text-gray-600">Unavailable</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-orange-600">
							{categoryCounts.appetizers}
						</div>
						<div className="text-sm text-gray-600">Appetizers</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-blue-600">
							{categoryCounts.mains}
						</div>
						<div className="text-sm text-gray-600">Mains</div>
					</div>
					<div className="bg-white p-4 rounded-lg shadow-sm border text-center">
						<div className="text-2xl font-bold text-pink-600">
							{categoryCounts.desserts}
						</div>
						<div className="text-sm text-gray-600">Desserts</div>
					</div>
				</div>

				{/* Category Filter */}
				<div className="flex gap-2 mb-6">
					{(["all", "appetizers", "mains", "desserts", "beverages"] as const).map(
						(category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-lg font-medium transition-colors ${
									selectedCategory === category
										? "bg-emerald-100 text-emerald-700 border border-emerald-200"
										: "text-gray-600 hover:bg-gray-100"
								}`}>
								{category === "all"
									? "All Items"
									: category.charAt(0).toUpperCase() + category.slice(1)}{" "}
								({categoryCounts[category]})
							</button>
						),
					)}
				</div>

				{/* Food Items Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{filteredItems.map((item) => (
						<FoodItemCard
							key={item.id}
							item={item}
							onEdit={handleEdit}
							onDelete={handleDelete}
							onToggleAvailability={handleToggleAvailability}
						/>
					))}
				</div>

				{filteredItems.length === 0 && (
					<div className="text-center py-12">
						<div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
							<svg
								className="w-8 h-8 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No food items found
						</h3>
						<p className="text-gray-500">
							Get started by adding your first food item to the menu.
						</p>
					</div>
				)}
			</div>

			{/* Create/Edit Modal */}
			{(selectedItem || showCreateModal) && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
						<div className="p-6 border-b">
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-semibold">
									{selectedItem ? "Edit Food Item" : "Add New Food Item"}
								</h2>
								<button
									onClick={() => {
										setSelectedItem(null);
										setShowCreateModal(false);
									}}
									className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>
						<div className="p-6">
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Food Name
									</label>
									<input
										type="text"
										defaultValue={selectedItem?.name || ""}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
										placeholder="Enter food name"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Category
										</label>
										<select
											defaultValue={selectedItem?.category || "mains"}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
											<option value="appetizers">Appetizers</option>
											<option value="mains">Mains</option>
											<option value="desserts">Desserts</option>
											<option value="beverages">Beverages</option>
										</select>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Price ($)
										</label>
										<input
											type="number"
											step="0.01"
											defaultValue={selectedItem?.price || ""}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
											placeholder="0.00"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Description
									</label>
									<textarea
										rows={3}
										defaultValue={selectedItem?.description || ""}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
										placeholder="Enter description"
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Preparation Time (minutes)
										</label>
										<input
											type="number"
											defaultValue={selectedItem?.preparationTime || ""}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
											placeholder="15"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Image URL
										</label>
										<input
											type="url"
											defaultValue={selectedItem?.image || ""}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
											placeholder="https://..."
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Allergens (comma separated)
									</label>
									<input
										type="text"
										defaultValue={selectedItem?.allergens?.join(", ") || ""}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
										placeholder="dairy, gluten, nuts"
									/>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										defaultChecked={selectedItem?.isAvailable ?? true}
										className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
									/>
									<label className="ml-2 text-sm text-gray-700">
										Available for ordering
									</label>
								</div>
							</div>
							<div className="flex justify-end gap-3 mt-6">
								<button
									onClick={() => {
										setSelectedItem(null);
										setShowCreateModal(false);
									}}
									className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
									Cancel
								</button>
								<button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
									{selectedItem ? "Update Item" : "Add Item"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</AdminLayout>
	);
};

export default DiningPage;
