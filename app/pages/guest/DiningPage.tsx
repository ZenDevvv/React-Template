import React, { useEffect, useMemo, useState } from "react";
import { DiningOrganism } from "../../components/organisms";
import { GuestPageTemplate } from "../../components/templates";
import type { MenuItem } from "../../types/cards";

type Category = {
	id: string;
	icon: React.ReactNode;
	label: string;
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
		id: "caesar-salad",
		name: "Caesar Salad",
		price: 12,
		description:
			"Romaine Lettuce • Parmesan Cheese • Croutons • Caesar Dressing • Black Pepper",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "salads",
		rating: 4.3,
		prepTime: "5-8 min",
	},
	{
		id: "greek-salad",
		name: "Greek Salad",
		price: 13,
		description: "Mixed Greens • Feta Cheese • Olives • Cucumber • Red Onion • Greek Dressing",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "salads",
		rating: 4.6,
		prepTime: "5-10 min",
		isVegan: true,
	},
	{
		id: "grilled-salmon",
		name: "Grilled Salmon",
		price: 28,
		description: "Fresh Atlantic Salmon • Lemon Butter Sauce • Asparagus • Wild Rice • Herbs",
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1796&auto=format&fit=crop",
		category: "mains",
		rating: 4.8,
		prepTime: "20-25 min",
		isPopular: true,
	},
	{
		id: "beef-steak",
		name: "Beef Tenderloin",
		price: 32,
		description:
			"Premium Beef Tenderloin • Red Wine Reduction • Mashed Potatoes • Seasonal Vegetables",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "mains",
		rating: 4.9,
		prepTime: "25-30 min",
	},
	{
		id: "chicken-breast",
		name: "Herb Roasted Chicken",
		price: 22,
		description: "Free-Range Chicken Breast • Rosemary • Thyme • Garlic • Roasted Vegetables",
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1796&auto=format&fit=crop",
		category: "mains",
		rating: 4.4,
		prepTime: "18-22 min",
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
		id: "carbonara",
		name: "Carbonara",
		price: 20,
		description: "Spaghetti • Pancetta • Eggs • Parmesan • Black Pepper • Fresh Parsley",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "pasta",
		rating: 4.5,
		prepTime: "15-20 min",
	},
	{
		id: "pesto-pasta",
		name: "Pesto Pasta",
		price: 18,
		description: "Fettuccine • Fresh Basil Pesto • Pine Nuts • Parmesan • Cherry Tomatoes",
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1796&auto=format&fit=crop",
		category: "pasta",
		rating: 4.3,
		prepTime: "12-18 min",
		isVegan: true,
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
	{
		id: "cheese-burger",
		name: "Cheese Burger",
		price: 19,
		description:
			"Angus Beef Patty • Cheddar Cheese • Lettuce • Tomato • Onion • Special Sauce • Brioche Bun",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "burgers",
		rating: 4.6,
		prepTime: "12-18 min",
	},
	{
		id: "veggie-burger",
		name: "Veggie Burger",
		price: 16,
		description: "Plant-Based Patty • Lettuce • Tomato • Avocado • Vegan Cheese • Brioche Bun",
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1796&auto=format&fit=crop",
		category: "burgers",
		rating: 4.2,
		prepTime: "10-15 min",
		isVegan: true,
	},
	{
		id: "chocolate-cake",
		name: "Chocolate Cake",
		price: 8,
		description: "Rich Chocolate Cake • Chocolate Ganache • Fresh Berries • Vanilla Ice Cream",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "desserts",
		rating: 4.8,
		prepTime: "5-8 min",
	},
	{
		id: "tiramisu",
		name: "Tiramisu",
		price: 9,
		description:
			"Classic Italian Dessert • Coffee-Soaked Ladyfingers • Mascarpone Cream • Cocoa Powder",
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1796&auto=format&fit=crop",
		category: "desserts",
		rating: 4.9,
		prepTime: "5-8 min",
	},
	{
		id: "ice-cream",
		name: "Artisan Ice Cream",
		price: 6,
		description: "Handcrafted Ice Cream • Vanilla Bean • Fresh Strawberries • Chocolate Chips",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "desserts",
		rating: 4.5,
		prepTime: "3-5 min",
	},
	{
		id: "fresh-juice",
		name: "Fresh Orange Juice",
		price: 4,
		description: "Freshly Squeezed Orange Juice • No Added Sugar • Vitamin C Rich • Chilled",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "drinks",
		rating: 4.7,
		prepTime: "2-3 min",
	},
	{
		id: "smoothie",
		name: "Berry Smoothie",
		price: 5,
		description: "Mixed Berries • Banana • Greek Yogurt • Honey • Almond Milk • Ice",
		image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1796&auto=format&fit=crop",
		category: "drinks",
		rating: 4.4,
		prepTime: "3-5 min",
	},
	{
		id: "coffee",
		name: "Artisan Coffee",
		price: 3,
		description: "Premium Coffee Beans • Freshly Ground • Hot or Iced • Cream Available",
		image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1792&auto=format&fit=crop",
		category: "drinks",
		rating: 4.6,
		prepTime: "2-4 min",
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
		console.log("Filtering items for category:", selectedCategory);
		const filtered = items.filter((item) => {
			const matchesCategory = item.category === selectedCategory;
			const matchesSearch =
				item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		});
		console.log("Filtered items count:", filtered.length);
		return filtered;
	}, [selectedCategory, searchQuery, items]);

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
	const handleCategoryChange = (category: string) => {
		console.log("Changing category from", selectedCategory, "to", category);
		setSelectedCategory(category);
	};

	// Debug effect to track category changes
	useEffect(() => {
		console.log("Category changed to:", selectedCategory);
	}, [selectedCategory]);

	return (
		<GuestPageTemplate>
			<DiningOrganism
				items={items}
				cart={cart}
				selectedCategory={selectedCategory}
				searchQuery={searchQuery}
				onAddToCart={add}
				onRemoveFromCart={sub}
				onCategoryChange={handleCategoryChange}
				onSearchChange={setSearchQuery}
				totalItems={totalItems}
			/>
		</GuestPageTemplate>
	);
};

export default DiningPage;
