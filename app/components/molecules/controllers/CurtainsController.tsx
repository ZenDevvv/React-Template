import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import * as Icons from "lucide-react";

interface Room {
	id: string;
	name: string;
	isOpen: boolean;
	position: number;
}

export const CurtainsController: React.FC = () => {
	const [rooms, setRooms] = useState<Room[]>([
		{ id: "foyer", name: "Foyer", isOpen: false, position: 0 },
		{ id: "family", name: "Family Room", isOpen: false, position: 0 },
		{ id: "room1", name: "Room 1", isOpen: false, position: 0 },
	]);

	const [expandedRoom, setExpandedRoom] = useState<string | null>("room1");

	const toggleRoom = (id: string) => {
		setExpandedRoom(expandedRoom === id ? null : id);
	};

	const updatePosition = (id: string, position: number) => {
		setRooms(
			rooms.map((room) =>
				room.id === id ? { ...room, position, isOpen: position > 0 } : room,
			),
		);
	};

	const setAllCurtains = (position: number) => {
		setRooms(
			rooms.map((room) => ({
				...room,
				position,
				isOpen: position > 0,
			})),
		);
	};

	return (
		<Card className="p-4 bg-white shadow-lg rounded-2xl">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<Icons.Blinds className="w-5 h-5 text-blue-600" />
					<Text as="h2" size="lg" weight="semibold">
						Curtains
					</Text>
				</div>
			</div>

			<div className="space-y-4">
				{rooms.map((room) => (
					<div key={room.id} className="space-y-3">
						<button
							onClick={() => toggleRoom(room.id)}
							className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
							<Text weight="medium">{room.name}</Text>
							<Icons.ChevronDown
								className={`w-4 h-4 text-gray-500 transition-transform ${
									expandedRoom === room.id ? "rotate-180" : ""
								}`}
							/>
						</button>

						{expandedRoom === room.id && (
							<div className="p-4 bg-white border border-gray-100 rounded-xl space-y-4">
								<div className="flex items-center space-x-3">
									<input
										type="range"
										min="0"
										max="100"
										value={room.position}
										onChange={(e) =>
											updatePosition(room.id, parseInt(e.target.value))
										}
										className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
										style={{
											background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${room.position}%, #e5e7eb ${room.position}%, #e5e7eb 100%)`,
										}}
									/>
									<Text size="sm" className="w-12 text-right">
										{room.position}%
									</Text>
								</div>

								<div className="flex items-center justify-between">
									<button
										onClick={() => updatePosition(room.id, 0)}
										className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
										All Off
									</button>
									<button
										onClick={() => updatePosition(room.id, 100)}
										className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
										All On
									</button>
									<button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
										<Icons.Clock className="w-4 h-4" />
										<span>Schedule</span>
									</button>
								</div>
							</div>
						)}
					</div>
				))}

				<div className="pt-4 border-t border-gray-100">
					<div className="flex items-center justify-between space-x-3">
						<button
							onClick={() => setAllCurtains(0)}
							className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
							All Off
						</button>
						<button
							onClick={() => setAllCurtains(100)}
							className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
							All On
						</button>
						<button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
							<Icons.Clock className="w-4 h-4" />
							<span>Schedule</span>
						</button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default CurtainsController;
