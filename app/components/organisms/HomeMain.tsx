import React from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Users, Star } from "lucide-react";
import { Card } from "../ui/card";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { ACWidget, MusicPlayer, ControlButtons, EventCard } from "../molecules";

export const HomeMain: React.FC = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-w-0">
			{/* Left column: Event and AD cards */}
			<div className="lg:col-span-2 flex flex-col space-y-4 min-w-0">
				<div className="flex-1 relative">
					<EventCard
						title="Event Name ABC"
						description="Quis dolore ipsum laboris culpa nost Quis dolore ipsum laboris culpa nost Quis dolore ipsum laboris culpa nost Quis dolore laboris culpa nost."
						imageUrl="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
						onReserve={() => console.log("Reserve clicked")}
					/>
					<div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center space-x-2 sm:space-x-3">
						<button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm hover:bg-blue-50 transition-colors">
							<ChevronLeft className="w-4 h-4 text-gray-600" />
						</button>
						<button className="w-10 h-10 flex items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm hover:bg-blue-50 transition-colors">
							<ChevronRight className="w-4 h-4 text-gray-600" />
						</button>
						<Text as="span" size="sm" weight="semibold" className="text-blue-600 ml-2">
							Today
						</Text>
					</div>
				</div>

				<div className="relative rounded-3xl overflow-hidden h-48 sm:h-56 lg:h-64 shadow-xl">
					<Image
						src="https://images.unsplash.com/photo-1503177119275-0aa32b3a9368"
						alt="Pyramids"
						className="w-full h-full object-cover"
					/>
					<div className="absolute top-4 left-4">
						<Text
							as="p"
							size="xs"
							className="text-white/90 bg-black/50 px-2 py-1 rounded">
							AD Space
						</Text>
					</div>
					<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
						<Text
							as="h3"
							size="2xl"
							weight="bold"
							className="text-white drop-shadow-lg">
							Immersive Experiences
						</Text>
					</div>
				</div>
			</div>

			{/* Right column: AC and Music widgets */}
			<div className="lg:col-span-1 flex flex-col space-y-4">
				<ACWidget />
				<MusicPlayer
					isPlaying={true}
					songTitle="Love In the Dark"
					artist="Adele"
					albumArt="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
				/>
				<ControlButtons />
			</div>
		</div>
	);
};

export default HomeMain;
