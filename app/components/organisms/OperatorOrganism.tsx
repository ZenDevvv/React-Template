import React from "react";
import { ServiceCard } from "../molecules";
import type { Service } from "../../types/cards";

interface OperatorOrganismProps {
	operatorServices: Service[];
	supportServices: Service[];
	transportServices: Service[];
	onServiceSelect: (service: Service) => void;
}

export const OperatorOrganism: React.FC<OperatorOrganismProps> = ({
	operatorServices,
	supportServices,
	transportServices,
	onServiceSelect,
}) => {
	return (
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
					{operatorServices.map((service) => (
						<ServiceCard
							key={service.key}
							service={service}
							onClick={onServiceSelect}
						/>
					))}
				</div>
			</div>

			{/* Support Services Section */}
			<div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
					{supportServices.map((service) => (
						<ServiceCard
							key={service.key}
							service={service}
							onClick={onServiceSelect}
						/>
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
					{transportServices.map((service) => (
						<ServiceCard
							key={service.key}
							service={service}
							onClick={onServiceSelect}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default OperatorOrganism;
