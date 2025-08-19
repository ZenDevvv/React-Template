import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import * as Icons from "lucide-react";
import { tuyaIRService } from "~/services/tuyaIRService";

export const TVController: React.FC = () => {
	const [volume, setVolume] = useState(50);
	const [isMuted, setIsMuted] = useState(false);
	const [channel, setChannel] = useState(1);

	return (
		<Card className="p-4 bg-white shadow-lg rounded-2xl">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center space-x-3">
					<Icons.Tv className="w-5 h-5 text-blue-600" />
					<Text as="h2" size="lg" weight="semibold">
						TV Control
					</Text>
				</div>
				<button
					onClick={async () => {
						try {
							await tuyaIRService.sendCommand(
								{
									category_id: 2,
									key_id: 0,
									key: "Power",
								},
								"TV",
							);
						} catch (error) {
							console.error("Failed to send TV command:", error);
						}
					}}
					className="p-2 rounded-full bg-gray-800 text-white font-bold transition-all duration-150 transform active:scale-95 active:bg-gray-700 hover:bg-gray-700">
					<Icons.Power className="w-4 h-4" />
				</button>
			</div>

			<div className="space-y-4">
				{/* Volume Control */}
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Text size="sm" weight="medium">
							Volume
						</Text>
						<button
							onClick={() => setIsMuted(!isMuted)}
							className={`p-1.5 rounded-lg transition-all duration-150 transform active:scale-95 ${
								isMuted
									? "bg-gray-100 text-gray-400 active:bg-gray-200"
									: "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
							}`}>
							{isMuted ? (
								<Icons.VolumeX className="w-4 h-4" />
							) : (
								<Icons.Volume2 className="w-4 h-4" />
							)}
						</button>
						<div className="flex items-center gap-2">
							<button
								onClick={async () => {
									try {
										await tuyaIRService.sendCommand(
											{ category_id: 2, key_id: 0, key: "Volume-" },
											"TV",
										);
										setIsMuted(false);
										setVolume((v) => Math.max(0, v - 5));
									} catch (error) {
										console.error("Failed to send TV command:", error);
									}
								}}
								className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-150 transform active:scale-95 active:bg-gray-300">
								<Text size="xs">Volume-</Text>
							</button>
							<button
								onClick={async () => {
									try {
										await tuyaIRService.sendCommand(
											{ category_id: 2, key_id: 0, key: "Volume+" },
											"TV",
										);
										setIsMuted(false);
										setVolume((v) => Math.min(100, v + 5));
									} catch (error) {
										console.error("Failed to send TV command:", error);
									}
								}}
								className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-150 transform active:scale-95 active:bg-gray-300">
								<Text size="xs">Volume+</Text>
							</button>
						</div>
					</div>
					<input
						type="range"
						min="0"
						max="100"
						value={isMuted ? 0 : volume}
						onChange={(e) => {
							setVolume(parseInt(e.target.value));
							setIsMuted(false);
						}}
						className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
						style={{
							background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
								isMuted ? 0 : volume
							}%, #e5e7eb ${isMuted ? 0 : volume}%, #e5e7eb 100%)`,
						}}
					/>
				</div>

				{/* Channel Controls */}
				<div className="grid grid-cols-3 gap-2">
					<button
						onClick={() => setChannel(Math.max(1, channel - 1))}
						className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-150 transform active:scale-95 active:bg-gray-300">
						<Icons.ChevronDown className="w-4 h-4 mx-auto" />
					</button>
					<div className="flex items-center justify-center bg-gray-100 rounded-lg">
						<Text weight="medium">CH {channel}</Text>
					</div>
					<button
						onClick={() => setChannel(channel + 1)}
						className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-150 transform active:scale-95 active:bg-gray-300">
						<Icons.ChevronUp className="w-4 h-4 mx-auto" />
					</button>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-4 gap-2">
					<button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-150 transform active:scale-95 active:bg-gray-300">
						<Text size="sm" className="text-center">
							1
						</Text>
					</button>
					<button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-150 transform active:scale-95 active:bg-gray-300">
						<Text size="sm" className="text-center">
							2
						</Text>
					</button>
					<button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-150 transform active:scale-95 active:bg-gray-300">
						<Text size="sm" className="text-center">
							3
						</Text>
					</button>
					<button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-150 transform active:scale-95 active:bg-gray-300">
						<Text size="sm" className="text-center">
							4
						</Text>
					</button>
				</div>
			</div>
		</Card>
	);
};

export default TVController;
