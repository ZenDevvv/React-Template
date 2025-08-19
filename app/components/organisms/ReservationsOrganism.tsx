import React from "react";
import { Search } from "lucide-react";
import { ReservationCard } from "../molecules";
import type { ReservationType } from "../../types/cards";

interface ReservationsOrganismProps {
	reservations: ReservationType[];
	selectedCategory: string;
	searchQuery: string;
	onCategoryChange: (category: string) => void;
	onSearchChange: (query: string) => void;
	onReserve: (reservation: ReservationType) => void;
}

export const ReservationsOrganism: React.FC<ReservationsOrganismProps> = ({
	reservations,
	selectedCategory,
	searchQuery,
	onCategoryChange,
	onSearchChange,
	onReserve,
}) => {
	const categories = [
		{ id: "all", name: "All Reservations" },
		{ id: "dining", name: "Fine Dining" },
		{ id: "spa", name: "Spa & Wellness" },
		{ id: "sports", name: "Sports & Recreation" },
		{ id: "pool", name: "Pool & Beach" },
		{ id: "meeting", name: "Meeting Rooms" },
		{ id: "events", name: "Event Spaces" },
	];

	const filteredReservations = reservations.filter((reservation) => {
		const matchesCategory =
			selectedCategory === "all" || reservation.category === selectedCategory;
		const matchesSearch =
			reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			reservation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			reservation.features.some((feature) =>
				feature.toLowerCase().includes(searchQuery.toLowerCase()),
			);
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="flex">
			{/* Sidebar Organism */}
			<aside className="w-80 min-h-screen bg-gradient-to-br from-gray-50 to-white border-r border-slate-200 flex flex-col">
				<div className="p-6 border-b border-slate-100 flex-shrink-0">
					<h2 className="text-xl font-bold text-slate-900">Reservation Categories</h2>
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
							<span className="font-medium text-base">{category.name}</span>
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
							{categories.find((c) => c.id === selectedCategory)?.name ||
								"All Reservations"}
						</h1>
						<p className="text-base text-slate-600">
							Exceptional experiences await you
						</p>
					</div>

					{/* Search Section */}
					<div className="flex items-center space-x-6">
						<div className="relative">
							<input
								type="text"
								placeholder="Search venues..."
								value={searchQuery}
								onChange={(e) => onSearchChange(e.target.value)}
								className="pl-12 pr-6 py-3 w-80 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
							/>
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
						</div>
					</div>
				</header>

				{/* Reservations Grid Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredReservations.map((reservation) => (
						<ReservationCard
							key={reservation.id}
							reservation={reservation}
							onReserve={onReserve}
						/>
					))}
				</div>

				{/* Empty State */}
				{filteredReservations.length === 0 && (
					<div className="text-center py-16">
						<div className="text-6xl mb-4">🔍</div>
						<h3 className="text-2xl font-bold text-slate-900 mb-2">No venues found</h3>
						<p className="text-slate-600">
							Try adjusting your search or browse other categories
						</p>
					</div>
				)}
			</main>
		</div>
	);
};

export default ReservationsOrganism;
