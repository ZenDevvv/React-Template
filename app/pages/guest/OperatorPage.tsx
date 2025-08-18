import React, { useState } from "react";
import {
	CheckCircle,
	Settings,
	Sparkles,
	Phone,
	Luggage,
	AlertTriangle,
	Bus,
	Car,
} from "lucide-react";

type Service = {
	key: string;
	title: string;
	icon: React.ReactNode;
	description: string;
	phone?: string; // for call operator
};

// Service descriptions for the cards
const serviceDescriptions = {
	checkout: "Streamlined checkout process for hassle-free departures",
	maintenance: "24/7 technical support and facility maintenance services",
	cleaning: "Professional housekeeping and sanitization services",
	call: "Direct line to our dedicated customer service team",
	luggage: "Professional baggage handling and storage solutions",
	emergency: "Immediate response for urgent situations and assistance",
	shuttle: "Complimentary shuttle service to and from the hotel",
	taxi: "Professional taxi services with transparent pricing",
};

const operatorServices: Service[] = [
	{
		key: "checkout",
		title: "Easy Check Out",
		icon: <CheckCircle className="w-10 h-10 text-blue-600" />,
		description: serviceDescriptions.checkout,
	},
	{
		key: "maintenance",
		title: "Maintenance",
		icon: <Settings className="w-10 h-10 text-gray-600" />,
		description: serviceDescriptions.maintenance,
	},
	{
		key: "cleaning",
		title: "Cleaning",
		icon: <Sparkles className="w-10 h-10 text-blue-600" />,
		description: serviceDescriptions.cleaning,
	},
	{
		key: "call",
		title: "Call Operator",
		icon: <Phone className="w-10 h-10 text-gray-600" />,
		description: serviceDescriptions.call,
		phone: "+11234567890",
	},
];

const supportServices: Service[] = [
	{
		key: "luggage",
		title: "Luggage Assist",
		icon: <Luggage className="w-10 h-10 text-blue-600" />,
		description: serviceDescriptions.luggage,
	},
	{
		key: "emergency",
		title: "Emergency",
		icon: <AlertTriangle className="w-10 h-10 text-gray-600" />,
		description: serviceDescriptions.emergency,
	},
];

const transportServices: Service[] = [
	{
		key: "shuttle",
		title: "Hotel Shuttle",
		icon: <Bus className="w-10 h-10 text-blue-600" />,
		description: serviceDescriptions.shuttle,
	},
	{
		key: "taxi",
		title: "Metered Taxi",
		icon: <Car className="w-10 h-10 text-gray-600" />,
		description: serviceDescriptions.taxi,
	},
];

const ServiceCard: React.FC<{ service: Service; onClick: (s: Service) => void }> = ({
	service,
	onClick,
}) => (
	<button
		onClick={() => onClick(service)}
		className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow p-6 w-full flex flex-col items-center justify-center gap-4">
		<div className="bg-gray-100 p-3 rounded-xl">{service.icon}</div>
		<div className="text-center">
			<div className="text-lg font-semibold text-gray-900 mb-2">{service.title}</div>
			<div className="text-sm text-gray-600 mb-3">{service.description}</div>
			<div
				className={`w-8 h-0.5 mx-auto ${service.key === "checkout" || service.key === "cleaning" || service.key === "luggage" || service.key === "shuttle" ? "bg-blue-500" : "bg-purple-500"}`}></div>
		</div>
	</button>
);

export const OperatorPage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedService, setSelectedService] = useState<Service | null>(null);
	const [form, setForm] = useState({ room: "", notes: "" });

	const handleSelect = (service: Service) => {
		if (service.phone) {
			window.location.href = `tel:${service.phone}`;
			return;
		}
		setSelectedService(service);
		setIsModalOpen(true);
	};

	const close = () => {
		setIsModalOpen(false);
		setSelectedService(null);
		setForm({ room: "", notes: "" });
	};

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		alert(`Request submitted for ${selectedService?.title} (Room ${form.room})`);
		close();
	};

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-12">
				{/* Operator Services Section */}
				<div>
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">Operator Services</h2>
						<div className="flex space-x-2">
							<div className="w-16 h-1 bg-blue-500"></div>
							<div className="w-32 h-1 bg-purple-500"></div>
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{operatorServices.map((s) => (
							<ServiceCard key={s.key} service={s} onClick={handleSelect} />
						))}
					</div>
				</div>

				{/* Support Services Section */}
				<div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
						{supportServices.map((s) => (
							<ServiceCard key={s.key} service={s} onClick={handleSelect} />
						))}
					</div>
				</div>

				{/* Transportation Services Section */}
				<div>
					<div className="mb-8">
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Transportation Services
						</h2>
						<div className="flex space-x-2">
							<div className="w-16 h-1 bg-blue-500"></div>
							<div className="w-32 h-1 bg-purple-500"></div>
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
						{transportServices.map((s) => (
							<ServiceCard key={s.key} service={s} onClick={handleSelect} />
						))}
					</div>
				</div>
			</div>

			{isModalOpen && selectedService && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden">
						<div className="p-6">
							<div className="flex items-start justify-between mb-4">
								<h3 className="text-2xl font-bold">{selectedService.title}</h3>
								<button
									onClick={close}
									className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 grid place-items-center">
									<span className="text-gray-600">×</span>
								</button>
							</div>
							<p className="text-gray-600 mb-4">
								Please provide your room number and any notes. Our team will assist
								you shortly.
							</p>
							<form onSubmit={submit} className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Room Number
									</label>
									<input
										value={form.room}
										onChange={(e) => setForm({ ...form, room: e.target.value })}
										required
										className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">
										Notes
									</label>
									<textarea
										value={form.notes}
										onChange={(e) =>
											setForm({ ...form, notes: e.target.value })
										}
										rows={4}
										className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
									/>
								</div>
								<button
									type="submit"
									className="w-full h-12 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
									Submit Request
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default OperatorPage;
