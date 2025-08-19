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
import { OperatorOrganism } from "../../components/organisms";
import { GuestPageTemplate } from "../../components/templates";
import type { Service } from "../../types/cards";

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

export const OperatorPage: React.FC = () => {
	const [selectedService, setSelectedService] = useState<Service | null>(null);

	const handleSelect = (service: Service) => {
		setSelectedService(service);
	};

	return (
		<GuestPageTemplate>
			<OperatorOrganism
				operatorServices={operatorServices}
				supportServices={supportServices}
				transportServices={transportServices}
				onServiceSelect={handleSelect}
			/>
		</GuestPageTemplate>
	);
};

export default OperatorPage;
