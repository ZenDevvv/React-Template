import React from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import * as Icons from "lucide-react";

interface AppLink {
	id: string;
	name: string;
	icon: string;
	url: string;
}

export const AppsPanel: React.FC = () => {
	const apps: AppLink[] = [
		{
			id: "youtube",
			name: "YouTube",
			icon: "/apps/youtube.png",
			url: "https://youtube.com",
		},
		{
			id: "spotify",
			name: "Spotify",
			icon: "/apps/spotify.png",
			url: "https://spotify.com",
		},
		{
			id: "prime",
			name: "Prime Video",
			icon: "/apps/prime.png",
			url: "https://primevideo.com",
		},
		{
			id: "netflix",
			name: "Netflix",
			icon: "/apps/netflix.png",
			url: "https://netflix.com",
		},
		{
			id: "appletv",
			name: "Apple TV+",
			icon: "/apps/appletv.png",
			url: "https://tv.apple.com",
		},
	];

	return (
		<Card className="p-4 bg-white shadow-lg rounded-2xl">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<Icons.LayoutGrid className="w-5 h-5 text-blue-600" />
					<Text as="h2" size="lg" weight="semibold">
						Apps
					</Text>
				</div>
				<a href="#" className="text-sm text-blue-600 hover:text-blue-700">
					View All
				</a>
			</div>

			<div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
				{apps.map((app) => (
					<a
						key={app.id}
						href={app.url}
						target="_blank"
						rel="noopener noreferrer"
						className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-gray-50 transition-colors">
						<img src={app.icon} alt={app.name} className="w-12 h-12 rounded-xl" />
						<Text size="xs" weight="medium" className="text-center">
							{app.name}
						</Text>
					</a>
				))}
			</div>
		</Card>
	);
};

export default AppsPanel;
