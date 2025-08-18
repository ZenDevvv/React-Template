import React, { useState, useMemo } from "react";
import { Search, Calendar, Clock, Users, Star, MapPin, Phone, Mail, X, Check } from "lucide-react";

type ReservationType = {
	id: string;
	name: string;
	image: string;
	availableTimes: string[];
	description: string;
	category: string;
	rating: number;
	reviewCount: number;
	location: string;
	phone: string;
	email: string;
	priceRange: string;
	features: string[];
	capacity: {
		min: number;
		max: number;
	};
	isPopular?: boolean;
	isPremium?: boolean;
};

type ReservationCategory = {
	id: string;
	name: string;
};

const categories: ReservationCategory[] = [
	{ id: "all", name: "All Reservations" },
	{ id: "dining", name: "Fine Dining" },
	{ id: "spa", name: "Spa & Wellness" },
	{ id: "sports", name: "Sports & Recreation" },
	{ id: "pool", name: "Pool & Beach" },
	{ id: "meeting", name: "Meeting Rooms" },
	{ id: "events", name: "Event Spaces" },
];

const mockReservations: ReservationType[] = [
	// Fine Dining
	{
		id: "the-metropolitan",
		name: "The Metropolitan",
		image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
		availableTimes: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
		description:
			"Sophisticated urban dining with innovative cocktails and modern cuisine. Experience exceptional service and stunning city views.",
		category: "dining",
		rating: 4.9,
		reviewCount: 247,
		location: "Anchorland Hotel - Rooftop",
		phone: "+1 (555) 345-6789",
		email: "bookings@themetropolitan.com",
		priceRange: "$$$$",
		features: ["Rooftop Bar", "Live Music", "Craft Cocktails", "City Views"],
		capacity: { min: 2, max: 12 },
		isPopular: true,
		isPremium: true,
	},
	{
		id: "garden-terrace",
		name: "Garden Terrace Bistro",
		image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop",
		availableTimes: ["12:00", "12:30", "13:00", "18:00", "18:30", "19:00", "19:30"],
		description:
			"Charming outdoor dining surrounded by lush gardens. Perfect for intimate lunches and romantic dinners with fresh ingredients.",
		category: "dining",
		rating: 4.6,
		reviewCount: 189,
		location: "Anchorland Hotel - Garden Level",
		phone: "+1 (555) 345-6789",
		email: "dining@anchorlandhotel.com",
		priceRange: "$$",
		features: ["Outdoor Seating", "Garden Views", "Farm-to-Table", "Pet Friendly"],
		capacity: { min: 2, max: 8 },
	},
	{
		id: "sushi-zen",
		name: "Sushi Zen",
		image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
		availableTimes: ["17:30", "18:00", "19:00", "20:00", "21:00"],
		description:
			"Authentic Japanese sushi experience with master chef Yamamoto. Fresh sashimi and creative rolls served in elegant atmosphere.",
		category: "dining",
		rating: 4.9,
		reviewCount: 156,
		location: "Anchorland Hotel - East Wing, Level 2",
		phone: "+1 (555) 345-6789",
		email: "dining@anchorlandhotel.com",
		priceRange: "$$$",
		features: ["Omakase", "Sushi Bar", "Private Tatami", "Sake Selection"],
		capacity: { min: 1, max: 10 },
		isPopular: true,
	},
	// Spa & Wellness
	{
		id: "serenity-spa",
		name: "Serenity Spa",
		image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
		availableTimes: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
		description:
			"Luxurious full-service spa offering rejuvenating treatments and massages. Experience ultimate relaxation in our tranquil environment.",
		category: "spa",
		rating: 4.7,
		reviewCount: 203,
		location: "Anchorland Hotel - Wellness Center, Level 3",
		phone: "+1 (555) 345-6789",
		email: "spa@anchorlandhotel.com",
		priceRange: "$$$",
		features: [
			"Full Service Spa",
			"Couples Massage",
			"Sauna",
			"Steam Room",
			"Relaxation Lounge",
		],
		capacity: { min: 1, max: 4 },
		isPremium: true,
	},
	{
		id: "wellness-center",
		name: "Holistic Wellness Center",
		image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
		availableTimes: ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"],
		description:
			"Comprehensive wellness center offering yoga and meditation classes. Holistic healing treatments for complete mind and body wellness.",
		category: "spa",
		rating: 4.5,
		reviewCount: 134,
		location: "Anchorland Hotel - North Wing, Ground Floor",
		phone: "+1 (555) 345-6789",
		email: "spa@anchorlandhotel.com",
		priceRange: "$$",
		features: ["Yoga Studio", "Meditation", "Aromatherapy", "Nutrition Counseling"],
		capacity: { min: 1, max: 6 },
	},
	// Sports & Recreation
	{
		id: "tennis-court",
		name: "Championship Tennis Court",
		image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
		availableTimes: ["07:00", "08:30", "10:00", "14:00", "15:30", "17:00"],
		description:
			"Professional-grade tennis courts with premium surfaces and lighting. Equipment rental and coaching sessions available on request.",
		category: "sports",
		rating: 4.4,
		reviewCount: 98,
		location: "Anchorland Hotel - Sports Complex, Outdoor Courts",
		phone: "+1 (555) 345-6789",
		email: "recreation@anchorlandhotel.com",
		priceRange: "$$",
		features: [
			"Professional Courts",
			"Equipment Rental",
			"Coaching Available",
			"Night Lighting",
		],
		capacity: { min: 2, max: 4 },
	},
	{
		id: "fitness-studio",
		name: "Elite Fitness Studio",
		image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
		availableTimes: ["06:00", "07:30", "09:00", "17:00", "18:30", "20:00"],
		description:
			"State-of-the-art fitness facility with personal training and group classes. Premium equipment and nutrition consultation available.",
		category: "sports",
		rating: 4.6,
		reviewCount: 167,
		location: "Anchorland Hotel - Sports Complex, Level 2",
		phone: "+1 (555) 345-6789",
		email: "fitness@anchorlandhotel.com",
		priceRange: "$$",
		features: ["Personal Training", "Group Classes", "Premium Equipment", "Nutritionist"],
		capacity: { min: 1, max: 15 },
	},
	// Pool & Beach
	{
		id: "infinity-pool",
		name: "Infinity Pool Deck",
		image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
		availableTimes: ["08:00", "10:00", "12:00", "14:00", "16:00"],
		description:
			"Stunning infinity pool with panoramic ocean views and underwater sound system. Premium poolside service and cabanas available.",
		category: "pool",
		rating: 4.8,
		reviewCount: 312,
		location: "Anchorland Hotel - Rooftop Pool Deck",
		phone: "+1 (555) 345-6789",
		email: "pool@anchorlandhotel.com",
		priceRange: "$$$",
		features: ["Ocean Views", "Poolside Service", "Cabanas", "Underwater Music"],
		capacity: { min: 2, max: 20 },
		isPopular: true,
		isPremium: true,
	},
	{
		id: "beach-cabana",
		name: "Private Beach Cabana",
		image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
		availableTimes: ["09:00", "11:00", "13:00", "15:00"],
		description:
			"Exclusive beachfront cabana with dedicated staff and premium amenities. Direct beach access with water sports equipment included.",
		category: "pool",
		rating: 4.7,
		reviewCount: 89,
		location: "Anchorland Hotel - Private Beach Access",
		phone: "+1 (555) 345-6789",
		email: "beach@anchorlandhotel.com",
		priceRange: "$$$",
		features: ["Private Beach", "Dedicated Staff", "Premium Amenities", "Water Sports"],
		capacity: { min: 2, max: 8 },
		isPremium: true,
	},
	// Meeting Rooms
	{
		id: "boardroom-executive",
		name: "Executive Boardroom",
		image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
		availableTimes: ["08:00", "10:00", "13:00", "15:00", "17:00"],
		description:
			"Premium boardroom with state-of-the-art AV equipment and high-speed internet. Professional catering services available for meetings.",
		category: "meeting",
		rating: 4.5,
		reviewCount: 78,
		location: "Anchorland Hotel - Business Center, 25th Floor",
		phone: "+1 (555) 345-6789",
		email: "meetings@anchorlandhotel.com",
		priceRange: "$$$",
		features: ["AV Equipment", "Video Conferencing", "Catering Available", "City Views"],
		capacity: { min: 4, max: 16 },
	},
	// Event Spaces
	{
		id: "grand-ballroom",
		name: "Grand Ballroom",
		image: "https://images.unsplash.com/photo-1519167758481-83f29c8dc73d?w=400&h=300&fit=crop",
		availableTimes: ["10:00", "14:00", "18:00"],
		description:
			"Elegant ballroom perfect for weddings and special events. Features crystal chandeliers with customizable lighting and sound system.",
		category: "events",
		rating: 4.9,
		reviewCount: 145,
		location: "Anchorland Hotel - Grand Floor",
		phone: "+1 (555) 345-6789",
		email: "events@anchorlandhotel.com",
		priceRange: "$$$$",
		features: [
			"Full Event Planning",
			"Catering Kitchen",
			"Dance Floor",
			"Premium Sound System",
		],
		capacity: { min: 50, max: 300 },
		isPremium: true,
	},
];

export const ReservationsPage: React.FC = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedReservation, setSelectedReservation] = useState<ReservationType | null>(null);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		date: "",
		time: "",
		guests: "2",
		specialRequests: "",
	});

	const filteredReservations = useMemo(() => {
		return mockReservations.filter((reservation) => {
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
	}, [selectedCategory, searchQuery]);

	const openModal = (reservation: ReservationType) => {
		setSelectedReservation(reservation);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedReservation(null);
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			date: "",
			time: "",
			guests: "2",
			specialRequests: "",
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Reservation submitted:", {
			...formData,
			reservation: selectedReservation?.name,
			reservationId: selectedReservation?.id,
		});
		alert(
			"Reservation request submitted successfully! We'll contact you shortly to confirm your booking.",
		);
		closeModal();
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
			<div className="flex">
				{/* Sidebar */}
				<aside className="w-80 min-h-screen bg-white border-r border-slate-200 shadow-xl flex flex-col">
					<div className="p-8 border-b border-slate-100 flex-shrink-0">
						<h2 className="text-2xl font-bold text-slate-900 mb-2">
							Reservation Categories
						</h2>
						<p className="text-slate-600">Discover our exclusive venues and services</p>
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
								<span className="font-medium">{category.name}</span>
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
								{categories.find((c) => c.id === selectedCategory)?.name ||
									"All Reservations"}
							</h1>
							<p className="text-slate-600">Exceptional experiences await you</p>
						</div>

						{/* Search */}
						<div className="flex items-center space-x-6">
							<div className="relative">
								<input
									type="text"
									placeholder="Search venues..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-12 pr-6 py-3 w-80 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
								/>
								<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
							</div>
						</div>
					</header>

					{/* Reservations Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredReservations.map((reservation) => (
							<div
								key={reservation.id}
								className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 flex flex-col h-full">
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

								<div className="p-6 flex-1 flex flex-col">
									<div className="flex items-start justify-between mb-3">
										<h3 className="text-xl font-bold text-slate-900">
											{reservation.name}
										</h3>
										<span className="text-lg font-bold text-emerald-600">
											{reservation.priceRange}
										</span>
									</div>

									<div className="flex items-center space-x-4 mb-4">
										<div className="flex items-center space-x-1">
											<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
											<span className="text-sm font-medium text-slate-700">
												{reservation.rating}
											</span>
											<span className="text-sm text-slate-500">
												({reservation.reviewCount})
											</span>
										</div>
										<div className="flex items-center space-x-1">
											<Users className="w-4 h-4 text-slate-500" />
											<span className="text-sm text-slate-600">
												{reservation.capacity.min}-
												{reservation.capacity.max} guests
											</span>
										</div>
									</div>

									<div className="flex items-center space-x-1 mb-4">
										<MapPin className="w-4 h-4 text-slate-500" />
										<span className="text-sm text-slate-600">
											{reservation.location}
										</span>
									</div>

									<p className="text-slate-600 text-sm mb-4 leading-relaxed h-12 overflow-hidden">
										{reservation.description}
									</p>

									<div className="mb-6">
										<p className="text-sm font-medium text-slate-700 mb-2">
											Features
										</p>
										<div className="flex flex-wrap gap-2">
											{reservation.features
												.slice(0, 3)
												.map((feature, index) => (
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
										<p className="text-sm font-medium text-slate-700 mb-2">
											Available Times
										</p>
										<div className="flex flex-wrap gap-2">
											{reservation.availableTimes
												.slice(0, 4)
												.map((time, index) => (
													<span
														key={index}
														className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200">
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
										onClick={() => openModal(reservation)}
										className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform active:scale-95 mt-auto">
										<Calendar className="w-4 h-4" />
										<span>Reserve Now</span>
									</button>
								</div>
							</div>
						))}
					</div>

					{filteredReservations.length === 0 && (
						<div className="text-center py-16">
							<div className="text-6xl mb-4">🔍</div>
							<h3 className="text-2xl font-bold text-slate-900 mb-2">
								No venues found
							</h3>
							<p className="text-slate-600">
								Try adjusting your search or browse other categories
							</p>
						</div>
					)}
				</main>
			</div>

			{/* Elegant Reservation Modal - Similar to provided design */}
			{isModalOpen && selectedReservation && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
						<div className="grid grid-cols-1 lg:grid-cols-5 h-full">
							{/* Left side - Form */}
							<div className="lg:col-span-3 p-8 overflow-y-auto">
								<div className="flex items-start justify-between mb-6">
									<div>
										<h2 className="text-2xl font-bold text-gray-900 mb-2">
											{selectedReservation.name}
										</h2>
										<p className="text-gray-600 text-sm mb-4">
											Reserve your table
										</p>
									</div>
									<button
										onClick={closeModal}
										className="p-2 hover:bg-gray-100 rounded-full transition-colors">
										<X className="w-5 h-5 text-gray-500" />
									</button>
								</div>

								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												First Name
											</label>
											<input
												type="text"
												required
												value={formData.firstName}
												onChange={(e) =>
													setFormData({
														...formData,
														firstName: e.target.value,
													})
												}
												placeholder="Enter your first name"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Last Name
											</label>
											<input
												type="text"
												required
												value={formData.lastName}
												onChange={(e) =>
													setFormData({
														...formData,
														lastName: e.target.value,
													})
												}
												placeholder="Enter your last name"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Email
											</label>
											<input
												type="email"
												required
												value={formData.email}
												onChange={(e) =>
													setFormData({
														...formData,
														email: e.target.value,
													})
												}
												placeholder="your.email@example.com"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Phone
											</label>
											<input
												type="tel"
												required
												value={formData.phone}
												onChange={(e) =>
													setFormData({
														...formData,
														phone: e.target.value,
													})
												}
												placeholder="+1 (555) 123-4567"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
											/>
										</div>
									</div>

									<div className="grid grid-cols-3 gap-4">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Date
											</label>
											<input
												type="date"
												required
												value={formData.date}
												onChange={(e) =>
													setFormData({
														...formData,
														date: e.target.value,
													})
												}
												min={new Date().toISOString().split("T")[0]}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
												placeholder="mm/dd/yyyy"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Time
											</label>
											<select
												required
												value={formData.time}
												onChange={(e) =>
													setFormData({
														...formData,
														time: e.target.value,
													})
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
												<option value="">Select time</option>
												{selectedReservation.availableTimes.map(
													(time, index) => (
														<option key={index} value={time}>
															{time}
														</option>
													),
												)}
											</select>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">
												Guests
											</label>
											<select
												required
												value={formData.guests}
												onChange={(e) =>
													setFormData({
														...formData,
														guests: e.target.value,
													})
												}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
												{Array.from(
													{
														length:
															selectedReservation.capacity.max -
															selectedReservation.capacity.min +
															1,
													},
													(_, i) => selectedReservation.capacity.min + i,
												).map((num) => (
													<option key={num} value={num}>
														{num} {num === 1 ? "Guest" : "Guests"}
													</option>
												))}
											</select>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Special Requests (Optional)
										</label>
										<textarea
											value={formData.specialRequests}
											onChange={(e) =>
												setFormData({
													...formData,
													specialRequests: e.target.value,
												})
											}
											placeholder="Any dietary restrictions, special occasions, or seating preferences..."
											rows={3}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
										/>
									</div>

									<button
										type="submit"
										className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-6">
										Confirm Reservation
									</button>
								</form>
							</div>

							{/* Right side - Image & Info */}
							<div className="lg:col-span-2 relative bg-gray-50">
								<img
									src={selectedReservation.image}
									alt={selectedReservation.name}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

								{/* Rating and Price overlay */}
								<div className="absolute top-4 right-4 flex items-center space-x-2">
									<div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1">
										<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
										<span className="text-sm font-medium text-gray-900">
											{selectedReservation.rating}
										</span>
									</div>
									<div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1">
										<span className="text-sm font-bold text-gray-900">
											{selectedReservation.priceRange}
										</span>
									</div>
								</div>

								{/* Bottom info overlay */}
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
									<p className="text-sm opacity-90 mb-2">
										{selectedReservation.location}
									</p>
									<p className="text-sm opacity-75 mb-4 leading-relaxed">
										{selectedReservation.description}
									</p>

									<div className="mb-4">
										<h4 className="text-sm font-semibold mb-2">Features</h4>
										<div className="flex flex-wrap gap-2">
											{selectedReservation.features
												.slice(0, 4)
												.map((feature, index) => (
													<span
														key={index}
														className="text-xs bg-white bg-opacity-20 backdrop-blur-sm px-2 py-1 rounded-full">
														{feature}
													</span>
												))}
										</div>
									</div>

									<div className="flex items-center justify-between text-sm">
										<div className="flex items-center space-x-1">
											<MapPin className="w-4 h-4" />
											<span className="opacity-90">
												Midtown Arts District
											</span>
										</div>
										<div className="flex items-center space-x-1">
											<Phone className="w-4 h-4" />
											<span className="opacity-90">+1 (555) 345-6789</span>
										</div>
									</div>

									<div className="flex items-center space-x-1 mt-2">
										<Mail className="w-4 h-4" />
										<span className="opacity-90 text-sm">
											{selectedReservation.email}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReservationsPage;
