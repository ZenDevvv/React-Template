import React, { useMemo, useState } from "react";
import { Clock, Play, Share2, Volume2, MoreHorizontal } from "lucide-react";
import { EntertainmentOrganism } from "../../components/organisms";
import { GuestPageTemplate } from "../../components/templates";
import type { Video } from "../../types/cards";

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
			category: "Music",
			thumbnail: "https://img.youtube.com/vi/kXYiU_JCYtU/mqdefault.jpg",
			youtubeId: "kXYiU_JCYtU",
		},
		{
			id: "8",
			title: "Ocean Waves for Sleep",
			subtitle: "Relaxing Ocean Sounds",
			duration: "8:00:00",
			category: "Ambient",
			thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/mqdefault.jpg",
			youtubeId: "1ZYbU82GVz4",
		},
		{
			id: "9",
			title: "Mountain Retreat Experience",
			subtitle: "Nature Documentary",
			duration: "1:15:45",
			category: "Travel",
			thumbnail: "https://img.youtube.com/vi/Dx5qFachd3A/mqdefault.jpg",
			youtubeId: "Dx5qFachd3A",
		},
		{
			id: "10",
			title: "City Lights Time Lapse",
			subtitle: "Urban Beauty",
			duration: "12:30",
			category: "Travel",
			thumbnail: "https://img.youtube.com/vi/L_LUpnjgP-s/mqdefault.jpg",
			youtubeId: "L_LUpnjgP-s",
		},
	];

	const [selectedVideo, setSelectedVideo] = useState(videos[0]);

	const categories = ["All", "Jazz", "Travel", "Ambient", "Culinary"];

	return (
		<GuestPageTemplate>
			<EntertainmentOrganism
				videos={videos}
				moreVideos={moreVideos}
				selectedVideo={selectedVideo}
				onVideoSelect={setSelectedVideo}
			/>
		</GuestPageTemplate>
	);
};

export default EntertainmentPage;
