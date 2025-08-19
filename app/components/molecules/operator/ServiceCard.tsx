import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { Service } from "../../../types/cards";

interface ServiceCardProps {
	service: Service;
	onClick: (service: Service) => void;
	className?: string;
	variant?: "default" | "blue" | "purple";
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
	service,
	onClick,
	className = "",
	variant = "default",
}) => {
	const getVariantStyles = () => {
		switch (variant) {
			case "blue":
				return "bg-blue-500";
			case "purple":
				return "bg-purple-500";
			default:
				return service.key === "checkout" ||
					service.key === "cleaning" ||
					service.key === "luggage" ||
					service.key === "shuttle"
					? "bg-blue-500"
					: "bg-purple-500";
		}
	};

	return (
		<Card
			onClick={() => onClick(service)}
			className={`hover:shadow-lg transition-all duration-300 cursor-pointer w-full bg-white border border-gray-200 hover:border-gray-300 ${className}`}>
			<CardContent className="p-6">
				<div className="flex flex-col items-center justify-center gap-4">
					{/* Icon Container */}
					<div className="bg-gray-100 p-3 rounded-xl flex items-center justify-center">
						{service.icon}
					</div>

					{/* Content */}
					<div className="text-center">
						<CardTitle className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
							{service.title}
						</CardTitle>
						<div className="text-sm text-gray-600 mb-3 leading-relaxed">
							{service.description}
						</div>
						{/* Colored underline */}
						<div className={`w-8 h-0.5 mx-auto ${getVariantStyles()}`}></div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ServiceCard;
