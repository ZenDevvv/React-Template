import React from "react";
import { Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import type { Video } from "../../../types/cards";

interface VideoCardProps {
	video: Video;
	onClick: (video: Video) => void;
	isSelected?: boolean;
	className?: string;
	variant?: "list" | "grid";
}

export const VideoCard: React.FC<VideoCardProps> = ({
	video,
	onClick,
	isSelected = false,
	className = "",
	variant = "list",
}) => {
	if (variant === "list") {
		return (
			<Card
				onClick={() => onClick(video)}
				className={`group cursor-pointer transition-all duration-200 ${
					isSelected
						? "bg-blue-100 border border-blue-300"
						: "hover:bg-gray-100 border border-transparent"
				} ${className}`}>
				<CardContent>
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
							<CardTitle className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
								{video.title}
							</CardTitle>
							<p className="text-xs text-gray-600 mb-1">{video.subtitle}</p>
							<div className="flex items-center justify-between">
								<span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
									{video.category}
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	// Grid variant
	return (
		<Card
			onClick={() => onClick(video)}
			className={`group cursor-pointer overflow-hidden hover:bg-gray-50 transition-all duration-300 hover:scale-105 ${className}`}>
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

			<CardContent>
				<CardTitle className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
					{video.title}
				</CardTitle>
				<p className="text-xs text-gray-600">{video.subtitle}</p>
			</CardContent>
		</Card>
	);
};

export default VideoCard;
