import React, { useState, useMemo } from "react";
import { Calendar, Clock, Users, Star, MapPin, Phone, Mail, X, Check } from "lucide-react";
import { ReservationsOrganism } from "../../components/organisms";
import { GuestPageTemplate } from "../../components/templates";

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
		<GuestPageTemplate>
			<ReservationsOrganism
				reservations={mockReservations}
				selectedCategory={selectedCategory}
				searchQuery={searchQuery}
				onCategoryChange={setSelectedCategory}
				onSearchChange={setSearchQuery}
				onReserve={openModal}
			/>

			{/* Modern Reservation Modal */}
			{isModalOpen && selectedReservation && (
				<div
					className="fixed inset-0 backdrop-blur-xl flex items-center justify-center p-2 sm:p-3 md:p-4 z-[9999]"
					onClick={closeModal}>
					<div
						className="bg-white/95 backdrop-blur-2xl rounded-2xl md:rounded-3xl max-w-4xl md:max-w-5xl w-full max-h-[90vh] md:max-h-[95vh] overflow-hidden border-2 border-gray-200/50"
						onClick={(e) => e.stopPropagation()}>
						<div className="grid grid-cols-1 md:grid-cols-2 h-full">
							{/* Left side - Form */}
							<div className="p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto pb-6 md:pb-8">
								<div className="mb-6 md:mb-8">
									<div>
										<h2 className="text-2xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
											{selectedReservation.name}
										</h2>
										<p className="text-gray-500 text-base md:text-lg font-medium">
											Reserve your experience
										</p>
									</div>
								</div>

								<form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
										<div className="space-y-2">
											<label className="block text-sm font-semibold text-gray-700">
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
												className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm"
											/>
										</div>
										<div className="space-y-2">
											<label className="block text-sm font-semibold text-gray-700">
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
												className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
										<div className="space-y-2">
											<label className="block text-sm font-semibold text-gray-700">
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
												className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm"
											/>
										</div>
										<div className="space-y-2">
											<label className="block text-sm font-semibold text-gray-700">
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
												className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
										<div className="space-y-2">
											<label className="block text-sm font-semibold text-gray-700">
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
												className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm"
												placeholder="mm/dd/yyyy"
											/>
										</div>
										<div className="space-y-2">
											<label className="block text-sm font-semibold text-gray-700">
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
												className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm">
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
										<div className="space-y-2">
											<label className="block text-sm font-semibold text-gray-700">
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
												className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 backdrop-blur-sm">
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

									<div className="space-y-2">
										<label className="block text-sm font-semibold text-gray-700">
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
											rows={4}
											className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
										/>
									</div>

									<button
										type="submit"
										className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl mt-6 md:mt-8 mb-4">
										Confirm Reservation
									</button>
								</form>
							</div>

							{/* Right side - Image & Info */}
							<div className="relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
								{/* Close button - top right corner */}
								<button
									onClick={closeModal}
									className="absolute top-6 right-6 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full transition-all duration-200 hover:bg-white/30 hover:scale-110 border border-white/30">
									<X className="w-6 h-6 text-white" />
								</button>

								<img
									src={selectedReservation.image}
									alt={selectedReservation.name}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

								{/* Rating and Price overlay */}
								<div className="absolute top-6 right-20 flex items-center space-x-3">
									<div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center space-x-2 shadow-lg">
										<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
										<span className="text-lg font-bold text-gray-900">
											{selectedReservation.rating}
										</span>
									</div>
									<div className="bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg">
										<span className="text-lg font-bold text-gray-900">
											{selectedReservation.priceRange}
										</span>
									</div>
								</div>

								{/* Bottom info overlay */}
								<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-6 md:p-8 text-white">
									<h3 className="text-xl sm:text-2xl font-bold mb-2 md:mb-3">
										{selectedReservation.location}
									</h3>
									<p className="text-base sm:text-lg opacity-90 mb-4 md:mb-6 leading-relaxed">
										{selectedReservation.description}
									</p>

									<div className="mb-4 md:mb-6">
										<h4 className="text-base sm:text-lg font-semibold mb-2 md:mb-3">
											Features
										</h4>
										<div className="flex flex-wrap gap-2 md:gap-3">
											{selectedReservation.features
												.slice(0, 4)
												.map((feature, index) => (
													<span
														key={index}
														className="text-xs sm:text-sm bg-white/20 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30">
														{feature}
													</span>
												))}
										</div>
									</div>

									<div className="grid grid-cols-1 gap-3 text-sm mb-4">
										<div className="flex items-center space-x-3">
											<MapPin className="w-5 h-5 text-blue-300" />
											<span className="opacity-90 font-medium">
												Midtown Arts District
											</span>
										</div>
										<div className="flex items-center space-x-3">
											<Phone className="w-5 h-5 text-blue-300" />
											<span className="opacity-90 font-medium">
												+1 (555) 345-6789
											</span>
										</div>
										<div className="flex items-center space-x-3">
											<Mail className="w-5 h-5 text-blue-300" />
											<span className="opacity-90 font-medium">
												{selectedReservation.email}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</GuestPageTemplate>
	);
};

export default ReservationsPage;
