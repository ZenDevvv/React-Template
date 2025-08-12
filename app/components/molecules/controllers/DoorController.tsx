import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import * as Icons from "lucide-react";

interface Door {
	id: string;
	name: string;
	isLocked: boolean;
	hasSchedule: boolean;
}

export const DoorController: React.FC = () => {
	const [doors, setDoors] = useState<Door[]>([
		{ id: "main", name: "Main Door", isLocked: true, hasSchedule: false },
		{ id: "balcony", name: "Balcony Door", isLocked: true, hasSchedule: false },
	]);

	const toggleLock = (id: string) => {
		setDoors(
			doors.map((door) => (door.id === id ? { ...door, isLocked: !door.isLocked } : door)),
		);
	};

	const toggleSchedule = (id: string) => {
		setDoors(
			doors.map((door) =>
				door.id === id ? { ...door, hasSchedule: !door.hasSchedule } : door,
			),
		);
	};

	return (
		<Card className="p-4 bg-white shadow-lg rounded-2xl">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<Icons.DoorClosed className="w-5 h-5 text-blue-600" />
					<Text as="h2" size="lg" weight="semibold">
						Door Lock Setting
					</Text>
				</div>
			</div>

			<div className="space-y-4">
				{doors.map((door) => (
					<div key={door.id} className="p-4 bg-gray-50 rounded-xl space-y-4">
						<div className="flex items-center justify-between">
							<Text weight="medium">{door.name}</Text>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
									checked={door.isLocked}
									onChange={() => toggleLock(door.id)}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>

						<div className="flex items-center justify-between pt-2 border-t border-gray-200">
							<div className="flex items-center space-x-2">
								<Icons.Clock className="w-4 h-4 text-gray-500" />
								<Text size="sm" variant="muted">
									Schedule Lock
								</Text>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
									checked={door.hasSchedule}
									onChange={() => toggleSchedule(door.id)}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};

export default DoorController;
