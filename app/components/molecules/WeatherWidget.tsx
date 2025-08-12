import React from "react";
import { Cloud, Sun, CloudRain } from "lucide-react";
import { Text } from "../ui/text";
import { Card } from "../ui/card";

interface WeatherWidgetProps {
	temperature?: number;
	condition?: "sunny" | "cloudy" | "rainy";
	location?: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
	temperature = 18,
	condition = "cloudy",
	location = "Manila",
}) => {
	const getWeatherIcon = () => {
		switch (condition) {
			case "sunny":
				return <Sun className="w-8 h-8 text-yellow-500" />;
			case "rainy":
				return <CloudRain className="w-8 h-8 text-blue-500" />;
			default:
				return <Cloud className="w-8 h-8 text-gray-500" />;
		}
	};

	const getConditionText = () => {
		switch (condition) {
			case "sunny":
				return "Sunny";
			case "rainy":
				return "Rainy";
			default:
				return "Cloudy";
		}
	};

	return (
		<Card className="p-4 text-center">
			<div className="flex flex-col items-center space-y-2">
				{getWeatherIcon()}
				<Text as="div" size="3xl" weight="bold">
					{temperature}°C
				</Text>
				<Text variant="muted" size="sm">
					{getConditionText()}
				</Text>
				<Text variant="muted" size="xs">
					{location}
				</Text>
			</div>
		</Card>
	);
};

export default WeatherWidget;
