import React, { useCallback, useState, useEffect } from "react";
import { useTuyaIRCommand } from "../../../hooks/useTuyaIRCommand";
import debounce from "lodash/debounce";

const DEVICE_ID = "ebd03d60a10029efb4bryq";
const MIN_TEMP = 16;
const MAX_TEMP = 30;

export const HomeACController: React.FC = () => {
	const [localTemp, setLocalTemp] = useState(18);
	const { acStatus, isLoadingStatus, sendCommand, isSendingCommand } =
		useTuyaIRCommand(DEVICE_ID);

	// Update local temperature when AC status changes
	useEffect(() => {
		if (acStatus?.temp) {
			setLocalTemp(parseInt(acStatus.temp));
		}
	}, [acStatus?.temp]);

	// Debounced function to send temperature command
	const debouncedSendTemp = useCallback(
		debounce((temp: number) => {
			sendCommand({
				category_id: 5,
				key_id: 0,
				key: "T" + temp.toString(),
			});
		}, 500),
		[sendCommand],
	);

	const handleTempChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newTemp = parseInt(event.target.value);
		setLocalTemp(newTemp);
		debouncedSendTemp(newTemp);
	};

	if (isLoadingStatus) {
		return (
			<div className="bg-white rounded-lg shadow p-4">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
					<div className="h-16 bg-gray-200 rounded mb-4"></div>
					<div className="h-8 bg-gray-200 rounded"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow p-4">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold">Climate</h3>
				<button
					onClick={() =>
					sendCommand({
						category_id: 5,
						key_id: 0,
						key: acStatus?.powerOpen ? "PowerOff" : "PowerOn",
					})
				}
					className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
						acStatus?.powerOpen
							? "bg-green-100 text-green-600"
							: "bg-gray-100 text-gray-400"
					}`}
					disabled={isSendingCommand}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				</button>
			</div>

			<div className="text-center mb-6">
				<div className="text-5xl font-bold mb-4">{localTemp}°C</div>
				<div className="w-full px-4">
					<input
						type="range"
						min={MIN_TEMP}
						max={MAX_TEMP}
						value={localTemp}
						onChange={handleTempChange}
						disabled={isSendingCommand || !acStatus?.powerOpen}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
					/>
					<div className="flex justify-between text-sm text-gray-500 mt-1">
						<span>{MIN_TEMP}°C</span>
						<span>{MAX_TEMP}°C</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-2">
				<button
					className={`p-3 rounded-lg transition-colors ${
						acStatus?.mode === "1"
							? "bg-blue-500 text-white"
							: "bg-blue-50 text-blue-600"
					}`}
					onClick={() => sendCommand({ category_id: 5, key_id: 0, key: "M1" })}
					disabled={isSendingCommand}>
					Cool
				</button>
				<button
					className={`p-3 rounded-lg transition-colors ${
						acStatus?.mode === "3"
							? "bg-purple-500 text-white"
							: "bg-purple-50 text-purple-600"
					}`}
					onClick={() => sendCommand({ category_id: 5, key_id: 0, key: "M3" })}
					disabled={isSendingCommand}>
					Sleep
				</button>
				<button
					className={`p-3 rounded-lg transition-colors ${
						acStatus?.mode === "4"
							? "bg-green-500 text-white"
							: "bg-green-50 text-green-600"
					}`}
					onClick={() => sendCommand({ category_id: 5, key_id: 0, key: "M4" })}
					disabled={isSendingCommand}>
					ION
				</button>
			</div>
		</div>
	);
};
