import React from "react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import { Image } from "../../ui/image";

interface EventCardProps {
	title: string;
	description: string;
	imageUrl: string;
	onReserve?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
	title,
	description,
	imageUrl,
	onReserve,
}) => {
	return (
		<Card
			className="!flex !flex-row overflow-hidden shadow-lg rounded-2xl bg-white !gap-0 !p-0"
			style={{ height: "300px" }}>
			{/* Event Image */}
			<div className="w-2/5 h-full">
				<Image src={imageUrl} alt={title} className="w-full h-full object-cover" />
			</div>

			{/* Event Content */}
			<div className="w-3/5 p-6 flex flex-col justify-center h-full">
				<div className="space-y-4">
					<Text as="h3" size="xl" weight="bold" className="text-gray-800 leading-tight">
						{title}
					</Text>
					<Text variant="muted" className="leading-relaxed text-gray-600">
						{description}
					</Text>
					<div className="pt-2">
						<Button
							onClick={onReserve}
							className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors">
							Reserve
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default EventCard;
