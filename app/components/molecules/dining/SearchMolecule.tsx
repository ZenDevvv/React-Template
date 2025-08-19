import React from "react";
import { Search } from "lucide-react";

interface SearchMoleculeProps {
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export const SearchMolecule: React.FC<SearchMoleculeProps> = ({
	placeholder = "Search...",
	value,
	onChange,
	className = "",
}) => {
	return (
		<div className={`relative ${className}`}>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="pl-12 pr-6 py-3 w-full border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
			/>
			<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
		</div>
	);
};

export default SearchMolecule;
