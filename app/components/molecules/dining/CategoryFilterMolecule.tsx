import React from "react";

interface Category {
	id: string;
	name: string;
}

interface CategoryFilterMoleculeProps {
	categories: Category[];
	selectedCategory: string;
	onCategoryChange: (categoryId: string) => void;
	className?: string;
}

export const CategoryFilterMolecule: React.FC<CategoryFilterMoleculeProps> = ({
	categories,
	selectedCategory,
	onCategoryChange,
	className = "",
}) => {
	return (
		<nav className={`flex-1 overflow-y-auto p-6 ${className}`}>
			{categories.map((category) => (
				<button
					key={category.id}
					onClick={() => onCategoryChange(category.id)}
					className={`w-full px-6 py-4 mb-2 rounded-2xl text-left transition-all duration-300 hover:bg-slate-50 hover:scale-105 ${
						selectedCategory === category.id
							? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
							: "text-slate-700 hover:text-slate-900"
					}`}>
					<span className="font-medium">{category.name}</span>
				</button>
			))}
		</nav>
	);
};

export default CategoryFilterMolecule;
