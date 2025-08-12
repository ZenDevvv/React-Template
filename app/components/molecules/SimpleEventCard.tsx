import React from "react";
import { Image } from "../ui/image";

interface SimpleEventCardProps {
	imageUrl: string;
	alt?: string;
}

export const SimpleEventCard: React.FC<SimpleEventCardProps> = ({ imageUrl, alt = "Event" }) => {
	return (
		<div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
			<Image src={imageUrl} alt={alt} className="w-full h-full object-cover" />
		</div>
	);
};

export default SimpleEventCard;
