import React from "react";
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
					{/* Welcome Page Navigation */}
					<div className="mt-12">
						<div className="inline-block px-6 py-3 bg-black/40 backdrop-blur-lg rounded-full border border-white/20 shadow-2xl">
							<div className="flex items-center space-x-3">
								<a
									href="/home"
									className="inline-flex flex-col items-center text-white hover:text-blue-200 transition-colors">
									<div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
											/>
										</svg>
									</div>
									<span className="text-xs text-white/90 mt-1">Home</span>
								</a>
								<a
									href="/controls"
									className="inline-flex flex-col items-center text-white hover:text-blue-200 transition-colors">
									<div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									</div>
									<span className="text-xs text-white/90 mt-1">Controls</span>
								</a>
								<a
									href="/entertainment"
									className="inline-flex flex-col items-center text-white hover:text-blue-200 transition-colors">
									<div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
											/>
										</svg>
									</div>
									<span className="text-xs text-white/90 mt-1">
										Entertainment
									</span>
								</a>
								<a
									href="/dining"
									className="inline-flex flex-col items-center text-white hover:text-blue-200 transition-colors">
									<div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
											/>
										</svg>
									</div>
									<span className="text-xs text-white/90 mt-1">Dining</span>
								</a>
								<a
									href="/reservations"
									className="inline-flex flex-col items-center text-white hover:text-blue-200 transition-colors">
									<div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-8 0h8m-8 0a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2"
											/>
										</svg>
									</div>
									<span className="text-xs text-white/90 mt-1">Reservations</span>
								</a>
								<a
									href="/operator"
									className="inline-flex flex-col items-center text-white hover:text-blue-200 transition-colors">
									<div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
											/>
										</svg>
									</div>
									<span className="text-xs text-white/90 mt-1">Operator</span>
								</a>
								<a
									href="/signout"
									className="inline-flex flex-col items-center text-white hover:text-blue-200 transition-colors">
									<div className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
											/>
										</svg>
									</div>
									<span className="text-xs text-white/90 mt-1">Sign Out</span>
								</a>
							</div>
						</div>
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
