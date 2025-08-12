import React from "react";
import NavigationMenu from "../molecules/NavigationMenu";
import { Text } from "../ui/text";
import { Image } from "../ui/image";

interface HeroSectionProps {
	guestName?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ guestName = "Ancorl" }) => {
	const currentTime = new Date();
	const hours = currentTime.getHours();
	const timeOfDay = hours < 12 ? "morning" : hours < 17 ? "afternoon" : "evening";

	return (
		<div className="relative h-screen w-full">
			<Image
				src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
				alt="Hotel Exterior"
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/50" />

			{/* Welcome Text and Menu - Middle Section */}
			<div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-white text-center">
				<div className="space-y-4 px-4">
					<Text
						as="p"
						size="xl"
						weight="light"
						variant="white"
						align="center"
						italic
						className="md:text-2xl tracking-wide">
						Greetings, {guestName}!
					</Text>
					<Text
						as="h1"
						size="3xl"
						weight="bold"
						variant="white"
						align="center"
						className="md:text-5xl lg:text-6xl leading-tight">
						Welcome to Dusit Thani Manila
					</Text>
					<Text
						as="p"
						size="base"
						weight="light"
						variant="white"
						align="center"
						className="md:text-lg opacity-90 mb-8">
						Experience luxury and comfort at its finest
					</Text>
					{/* Navigation Menu */}
					<div className="mt-12">
						<NavigationMenu />
					</div>
				</div>
			</div>

			{/* Top Left - Humidity */}
			<div className="absolute top-6 left-6 flex items-center text-white">
				<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 2s-6 6-6 10a6 6 0 1012 0c0-4-6-10-6-10z" />
				</svg>
				<span className="text-lg font-medium">52% Humidity</span>
			</div>

			{/* Top Right - Date and Time */}
			<div className="absolute top-6 right-6 text-white text-right">
				<div className="space-y-1">
					<div className="text-lg font-medium">
						{currentTime.toLocaleDateString("en-US", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</div>
					<div className="text-2xl font-bold">
						{currentTime.toLocaleTimeString("en-US", {
							hour: "2-digit",
							minute: "2-digit",
							hour12: true,
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
