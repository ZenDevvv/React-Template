import React, { useMemo, useState } from "react";
import { Clock, Play, Share2, Volume2, MoreHorizontal } from "lucide-react";
import { truncateText } from "../../lib/utils";

// Custom CSS for hiding scrollbars
const scrollbarHideStyles = `
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
`;

interface Video {
	id: string;
	title: string;
	subtitle: string;
	duration: string;
	category: string;
	thumbnail: string;
	youtubeId: string;
	isLive?: boolean;
}

export const EntertainmentPage: React.FC = () => {
	const videos: Video[] = useMemo(
		() => [
			{
				id: "1",
				title: "Relaxing Hotel Lobby Jazz",
				subtitle: "Ambient Background Music",
				duration: "2:45:30",
				category: "Jazz",
				thumbnail: "https://img.youtube.com/vi/OO61_wjXvUY/mqdefault.jpg",
				youtubeId: "OO61_wjXvUY",
				isLive: true,
			},
			{
				id: "2",
				title: "Hotel Room Tour - Luxury Suite",
				subtitle: "Premium Accommodations",
				duration: "12:45",
				category: "Travel",
				thumbnail: "https://img.youtube.com/vi/Dx5qFachd3A/mqdefault.jpg",
				youtubeId: "Dx5qFachd3A",
			},
			{
				id: "3",
				title: "Relaxing Spa Music with Nature Sounds",
				subtitle: "Meditation & Wellness",
				duration: "1:30:00",
				category: "Ambient",
				thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/mqdefault.jpg",
				youtubeId: "1ZYbU82GVz4",
			},
			{
				id: "4",
				title: "Hotel Cooking Channel - Chef's Special",
				subtitle: "Culinary Excellence",
				duration: "25:30",
				category: "Culinary",
				thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
				youtubeId: "dQw4w9WgXcQ",
			},
			{
				id: "5",
				title: "Beautiful Beach Resort Views",
				subtitle: "Tropical Paradise",
				duration: "45:20",
				category: "Travel",
				thumbnail: "https://img.youtube.com/vi/kXYiU_JCYtU/mqdefault.jpg",
				youtubeId: "kXYiU_JCYtU",
			},
			{
				id: "6",
				title: "Cozy Fireplace Ambience",
				subtitle: "Winter Relaxation",
				duration: "3:15:00",
				category: "Ambient",
				thumbnail: "https://img.youtube.com/vi/L_LUpnjgP-s/mqdefault.jpg",
				youtubeId: "L_LUpnjgP-s",
			},
		],
		[],
	);

	const moreVideos: Video[] = [
		{
			id: "7",
			title: "Music Studio Production",
			subtitle: "Behind the Scenes",
			duration: "2:45:30",
			thumbnail: "https://img.youtube.com/vi/kXYiU_JCYtU/mqdefault.jpg",
			youtubeId: "kXYiU_JCYtU",
		},
		{
			id: "8",
			title: "Ocean Waves for Sleep",
			subtitle: "Relaxing Ocean Sounds",
			duration: "8:00:00",
			thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/mqdefault.jpg",
			youtubeId: "1ZYbU82GVz4",
		},
		{
			id: "9",
			title: "Mountain Retreat Experience",
			subtitle: "Nature Documentary",
			duration: "1:15:45",
			thumbnail: "https://img.youtube.com/vi/Dx5qFachd3A/mqdefault.jpg",
			youtubeId: "Dx5qFachd3A",
		},
		{
			id: "10",
			title: "City Lights Time Lapse",
			subtitle: "Urban Beauty",
			duration: "12:30",
			thumbnail: "https://img.youtube.com/vi/L_LUpnjgP-s/mqdefault.jpg",
			youtubeId: "L_LUpnjgP-s",
		},
	];

	const [selectedVideo, setSelectedVideo] = useState(videos[0]);

	const categories = ["All", "Jazz", "Travel", "Ambient", "Culinary"];

	return (
		<div className="min-h-screen bg-white">
			<div className="flex h-screen">
				{/* Left Sidebar */}
				<div className="w-80 bg-gray-50 border-r border-gray-200 p-6">
					<div className="mb-6">
						<h2 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
							<Clock className="w-5 h-5 text-gray-600" />
							<span>Available Videos</span>
						</h2>

						{/* Category Filter */}
						<div className="flex flex-wrap gap-2 mb-4">
							{categories.map((category) => (
								<button
									key={category}
									className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full transition-colors">
									{category}
								</button>
							))}
						</div>
					</div>

					<div className="space-y-3">
						{videos.map((video) => (
							<div
								key={video.id}
								onClick={() => setSelectedVideo(video)}
								className={`group cursor-pointer rounded-lg p-3 transition-all duration-200 ${
									selectedVideo.id === video.id
										? "bg-blue-100 border border-blue-300"
										: "hover:bg-gray-100 border border-transparent"
								}`}>
								<div className="flex items-start space-x-3">
									<div className="relative flex-shrink-0">
										<img
											src={video.thumbnail}
											alt={video.title}
											className="w-16 h-12 object-cover rounded-md"
										/>
										{video.isLive && (
											<div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
												LIVE
											</div>
										)}
										<div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
											{video.duration}
										</div>
									</div>

									<div className="flex-1 min-w-0">
										<h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
											{video.title}
										</h3>
										<p className="text-xs text-gray-600 mb-1">
											{video.subtitle}
										</p>
										<div className="flex items-center justify-between">
											<span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
												{video.category}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Main Content */}
				<div className="flex-1 p-6">
					{/* Video Player */}
					<div className="bg-black rounded-xl overflow-hidden shadow-2xl mb-8">
						<div className="relative aspect-video">
							<iframe
								src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
								title={selectedVideo.title}
								className="w-full h-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>

						{/* Video Info Below Player */}
						<div className="p-6 bg-white">
							<div className="flex items-start justify-between">
								<div>
									<h1 className="text-2xl font-bold text-gray-900 mb-2">
										{selectedVideo.title}
									</h1>
									<p className="text-gray-600 mb-3">{selectedVideo.subtitle}</p>
								</div>

								<div className="flex items-center space-x-4">
									<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
										<Play className="w-4 h-4" />
										<span>Play</span>
									</button>
									<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors">
										<Share2 className="w-4 h-4" />
									</button>
									<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors">
										<Volume2 className="w-4 h-4" />
									</button>
									<button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors">
										<MoreHorizontal className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* More Videos */}
					<div>
						<h2 className="text-xl font-bold text-gray-900 mb-6">More Videos</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{moreVideos.map((video) => (
								<div
									key={video.id}
									onClick={() => setSelectedVideo(video)}
									className="group cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-sm">
									<div className="relative">
										<img
											src={video.thumbnail}
											alt={video.title}
											className="w-full aspect-video object-cover"
										/>
										<div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
											{video.duration}
										</div>
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
											<div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
												<Play className="w-6 h-6 text-white" />
											</div>
										</div>
									</div>

									<div className="p-4">
										<h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
											{video.title}
										</h3>
										<p className="text-xs text-gray-600">{video.subtitle}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EntertainmentPage;
