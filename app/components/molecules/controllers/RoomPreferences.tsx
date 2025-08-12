import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import * as Icons from "lucide-react";

interface Service {
	id: string;
	name: string;
	icon: React.ReactNode;
	isActive: boolean;
}

export const RoomPreferences: React.FC = () => {
	const [services, setServices] = useState<Service[]>([
		{
			id: "dnd",
			name: "Do not disturb",
			icon: <Icons.Moon className="w-6 h-6" />,
			isActive: false,
		},
		{
			id: "cleaning",
			name: "Clean room",
			icon: <Icons.Brush className="w-6 h-6" />,
			isActive: false,
		},
		{
			id: "laundry",
			name: "Laundry Service",
			icon: <Icons.Shirt className="w-6 h-6" />,
			isActive: false,
		},
		{
			id: "pillows",
			name: "Extra Pillows",
			icon: <Icons.Bed className="w-6 h-6" />,
			isActive: false,
		},
		{
			id: "linens",
			name: "Extra Linens",
			icon: <Icons.Users className="w-6 h-6" />,
			isActive: false,
		},
		{
			id: "crib",
			name: "Crib Request",
			icon: <Icons.Baby className="w-6 h-6" />,
			isActive: false,
		},
	]);

	const toggleService = (id: string) => {
		setServices(
			services.map((service) =>
				service.id === id ? { ...service, isActive: !service.isActive } : service,
			),
		);
	};

	return (
		<Card className="p-4 bg-white shadow-lg rounded-2xl">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<Icons.Settings className="w-5 h-5 text-blue-600" />
					<Text as="h2" size="lg" weight="semibold">
						Room Preference
					</Text>
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
				{services.map((service) => (
					<button
						key={service.id}
						onClick={() => toggleService(service.id)}
						className={`p-4 rounded-xl flex flex-col items-center space-y-3 transition-all ${
							service.isActive
								? "bg-blue-100 text-blue-600"
								: "bg-gray-50 text-gray-600 hover:bg-gray-100"
						}`}>
						{service.icon}
						<Text size="sm" weight="medium" className="text-center">
							{service.name}
						</Text>
					</button>
				))}
			</div>
		</Card>
	);
};

export default RoomPreferences;
