import React from "react";
import Header from "../molecules/Header";
import HorizontalNav from "../molecules/HorizontalNav";
import EventCard from "../molecules/EventCard";
import ACWidget from "../molecules/ACWidget";
import MusicPlayer from "../molecules/MusicPlayer";
import ControlButtons from "../molecules/ControlButtons";
import { Text } from "../ui/text";
import { Image } from "../ui/image";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export const DashboardLayout: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
			{/* Header */}
			<div className="flex-shrink-0">
				<Header />
			</div>

			{/* Horizontal Navigation */}
			<div className="flex-shrink-0">
				<HorizontalNav />
			</div>

			{/* Main Content */}
			<div className="flex flex-col lg:flex-row flex-1 p-4 sm:p-6 space-y-6 lg:space-y-0 lg:space-x-6 min-h-0">
				{/* Left Content */}
				<div className="flex-1 flex flex-col space-y-4 min-w-0">
					{/* Event Card with Navigation Inside */}
					<div className="flex-1">
						<div className="h-full">
							<Card
								className="!flex !flex-col sm:!flex-row overflow-hidden shadow-xl rounded-3xl bg-white !gap-0 !p-0 border-0"
								style={{ minHeight: "250px" }}>
								{/* Event Image */}
								<div className="w-full sm:w-2/5 h-48 sm:h-full">
									<Image
										src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
										alt="Event Name ABC"
										className="w-full h-full object-cover"
									/>
								</div>

								{/* Event Content with Navigation */}
								<div className="w-full sm:w-3/5 p-4 sm:p-6 flex flex-col justify-center h-full relative">
									{/* Navigation controls in top right of content area */}
									<div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center space-x-2 sm:space-x-3">
										<button className="p-2 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm">
											<span className="text-gray-600 text-sm">←</span>
										</button>
										<button className="p-2 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 bg-white shadow-sm">
											<span className="text-gray-600 text-sm">→</span>
										</button>
										<Text
											as="span"
											size="sm"
											weight="semibold"
											className="text-blue-600 ml-2">
											Today
										</Text>
									</div>

									{/* Event content */}
									<div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
										<Text
											as="h3"
											size="xl"
											weight="bold"
											className="text-gray-800 leading-tight">
											Event Name ABC
										</Text>
										<Text
											variant="muted"
											className="leading-relaxed text-gray-600">
											Quis dolore ipsum laboris culpa nost Quis dolore ipsum
											laboris culpa nost Quis dolore ipsum laboris culpa nost
											Quis dolore ipsum laboris culpa nost Quis dolore laboris
											culpa nost.
										</Text>
										<div className="pt-2">
											<Button
												onClick={() => console.log("Reserve clicked")}
												className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-medium transition-colors">
												Reserve
											</Button>
										</div>
									</div>
								</div>
							</Card>
						</div>
					</div>

					{/* AD Space - Immersive Experiences */}
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

				{/* Right Sidebar */}
				<div className="w-full lg:w-80 flex flex-col space-y-4 min-h-0">
					{/* AC Widget */}
					<div className="flex-shrink-0">
						<ACWidget />
					</div>

					{/* Music Player */}
					<div className="flex-shrink-0">
						<MusicPlayer
							isPlaying={true}
							songTitle="Love In the Dark"
							artist="Adele"
							albumArt="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
						/>
					</div>

					{/* Control Buttons */}
					<div className="flex-shrink-0">
						<ControlButtons />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
