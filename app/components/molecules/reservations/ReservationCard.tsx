import React from "react";
import { Star, Users, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { ReservationType } from "../../../types/cards";

interface ReservationCardProps {
	reservation: ReservationType;
	onReserve: (reservation: ReservationType) => void;
	className?: string;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
	reservation,
	onReserve,
	className = "",
}) => {
	return (
		<Card
			className={`overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full ${className}`}>
			<div className="relative">
				<img
					src={reservation.image}
					alt={reservation.name}
					className="w-full h-56 object-cover"
				/>
				<div className="absolute top-4 right-4 flex space-x-2">
					{reservation.isPopular && (
						<span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
							Popular
						</span>
					)}
					{reservation.isPremium && (
						<span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
							Premium
						</span>
					)}
				</div>
			</div>

			<CardContent className="flex-1 flex flex-col">
				<CardHeader className="p-0 mb-3">
					<div className="flex items-start justify-between">
						<CardTitle className="text-xl text-slate-900">{reservation.name}</CardTitle>
						<span className="text-lg font-bold text-blue-600">
							{reservation.priceRange}
						</span>
					</div>
				</CardHeader>

				<div className="flex items-center space-x-4 mb-4">
					<div className="flex items-center space-x-1">
						<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
						<span className="text-sm font-medium text-slate-700">
							{reservation.rating}
						</span>
						<span className="text-sm text-slate-500">({reservation.reviewCount})</span>
					</div>
					<div className="flex items-center space-x-1">
						<Users className="w-4 h-4 text-slate-500" />
						<span className="text-sm text-slate-600">
							{reservation.capacity.min}-{reservation.capacity.max} guests
						</span>
					</div>
				</div>

				<div className="flex items-center space-x-1 mb-4">
					<MapPin className="w-4 h-4 text-slate-500" />
					<span className="text-sm text-slate-600">{reservation.location}</span>
				</div>

				<p className="text-slate-600 text-sm mb-4 leading-relaxed h-12 overflow-hidden">
					{reservation.description}
				</p>

				<div className="mb-6">
					<p className="text-sm font-medium text-slate-700 mb-2">Features</p>
					<div className="flex flex-wrap gap-2">
						{reservation.features.slice(0, 3).map((feature, index) => (
							<span
								key={index}
								className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
								{feature}
							</span>
						))}
						{reservation.features.length > 3 && (
							<span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
								+{reservation.features.length - 3} more
							</span>
						)}
					</div>
				</div>

				<div className="mb-6">
					<p className="text-sm font-medium text-slate-700 mb-2">Available Times</p>
					<div className="flex flex-wrap gap-2">
						{reservation.availableTimes.slice(0, 4).map((time, index) => (
							<span
								key={index}
								className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
								{time}
							</span>
						))}
						{reservation.availableTimes.length > 4 && (
							<span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
								+{reservation.availableTimes.length - 4} more
							</span>
						)}
					</div>
				</div>

				<button
					onClick={() => onReserve(reservation)}
					className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform active:scale-95 mt-auto">
					<Calendar className="w-4 h-4" />
					<span>Reserve Now</span>
				</button>
			</CardContent>
		</Card>
	);
};

export default ReservationCard;
