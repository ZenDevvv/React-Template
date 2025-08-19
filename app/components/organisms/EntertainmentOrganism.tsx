import React from "react";
import { Clock, Play, Share2, Volume2, MoreHorizontal } from "lucide-react";
import { VideoCard } from "../molecules";
import type { Video } from "../../types/cards";

interface EntertainmentOrganismProps {
	videos: Video[];
	moreVideos: Video[];
	selectedVideo: Video;
	onVideoSelect: (video: Video) => void;
}

export const EntertainmentOrganism: React.FC<EntertainmentOrganismProps> = ({
	videos,
	moreVideos,
	selectedVideo,
	onVideoSelect,
}) => {
	const categories = ["All", "Jazz", "Travel", "Ambient", "Culinary"];

	return (
		<div className="flex h-screen">
			{/* Left Sidebar Organism */}
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
						<VideoCard
							key={video.id}
							video={video}
							onClick={onVideoSelect}
							isSelected={selectedVideo.id === video.id}
							variant="list"
						/>
					))}
				</div>
			</div>

			{/* Main Content Organism */}
			<div className="flex-1 p-6">
				{/* Video Player Section */}
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

					{/* Video Info Section */}
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

				{/* More Videos Section */}
				<div>
					<h2 className="text-xl font-bold text-gray-900 mb-6">More Videos</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{moreVideos.map((video) => (
							<VideoCard
								key={video.id}
								video={video}
								onClick={onVideoSelect}
								variant="grid"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EntertainmentOrganism;
