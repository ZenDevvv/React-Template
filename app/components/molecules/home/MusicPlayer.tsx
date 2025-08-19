import React from "react";
import { Play, SkipBack, SkipForward, Music, Bluetooth } from "lucide-react";
import { Text } from "../../ui/text";
import { Image } from "../../ui/image";
import { Card, CardContent } from "../../ui/card";

interface MusicPlayerProps {
	isPlaying?: boolean;
	songTitle?: string;
	artist?: string;
	albumArt?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
	isPlaying = true,
	songTitle = "Love In the Dark",
	artist = "Adele",
	albumArt = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
}) => {
	return (
		<Card className="max-h-48 overflow-hidden">
			<CardContent>
				{/* Header with music note and bluetooth */}
				<div className="flex items-center justify-between mb-3">
					<Music className="w-5 h-5 text-gray-400" />
					<Bluetooth className="w-5 h-5 text-gray-400" />
				</div>

				{/* Album Art and Info */}
				<div className="flex items-center space-x-4 mb-4">
					<Image
						src={albumArt}
						alt={`${songTitle} by ${artist}`}
						className="w-12 h-12 rounded-xl flex-shrink-0 object-cover"
					/>
					<div className="flex-1 min-w-0">
						<Text
							as="p"
							size="sm"
							weight="medium"
							truncate
							className="text-gray-800 mb-1">
							{songTitle}
						</Text>
						<Text as="p" size="xs" variant="muted" truncate>
							{artist}
						</Text>
					</div>
				</div>

				{/* Music Controls */}
				<div className="flex items-center justify-center space-x-4">
					<button className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
						<SkipBack className="w-4 h-4 text-gray-600" />
					</button>
					<button className="p-3 rounded-full bg-orange-400 hover:bg-orange-500 transition-colors">
						<Play className="w-5 h-5 text-white" />
					</button>
					<button className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
						<SkipForward className="w-4 h-4 text-gray-600" />
					</button>
				</div>
			</CardContent>
		</Card>
	);
};

export default MusicPlayer;
