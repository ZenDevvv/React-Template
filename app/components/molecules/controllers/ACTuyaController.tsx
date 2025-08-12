import React, { useCallback } from "react";
import { useTuyaIRCommand } from "../../../hooks/useTuyaIRCommand";
import debounce from "lodash/debounce";

const DEVICE_ID = "ebd03d60a10029efb4bryq";

export const ACTuyaController: React.FC = () => {
	const { acStatus, isLoadingStatus, sendCommand, isSendingCommand } =
		useTuyaIRCommand(DEVICE_ID);

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

	const handleTempChange = (increment: boolean) => {
		if (!acStatus) return;

		const currentTemp = parseInt(acStatus.temp);
		const newTemp = increment ? currentTemp + 1 : currentTemp - 1;
		// Limit temperature range
		const limitedTemp = Math.min(Math.max(newTemp, 16), 30);

		debouncedSendTemp(limitedTemp);
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
				<h3 className="text-lg font-semibold">Air Conditioner</h3>
				<div
					className={`w-12 h-12 rounded-full flex items-center justify-center ${
						acStatus?.powerOpen ? "bg-green-50" : "bg-gray-50"
					}`}>
					<span className={acStatus?.powerOpen ? "text-green-500" : "text-gray-400"}>
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
								d="M5 10a7 7 0 0114 0v4a7 7 0 11-14 0v-4z"
							/>
						</svg>
					</span>
				</div>
			</div>

			<div className="text-center mb-6">
				<div className="text-5xl font-bold mb-4">{acStatus?.temp || "--"}°C</div>
				<div className="flex justify-center gap-4">
					<button
						className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${
							isSendingCommand ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
						}`}
						onClick={() => handleTempChange(false)}
						disabled={isSendingCommand}>
						-
					</button>
					<button
						className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${
							isSendingCommand ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
						}`}
						onClick={() => handleTempChange(true)}
						disabled={isSendingCommand}>
						+
					</button>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-2">
				<button
					className={`p-2 rounded ${acStatus?.mode === "0" ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"} text-sm`}
					onClick={() => sendCommand({ category_id: 5, key_id: 1, key: "M0" })}>
					<span>Auto</span>
				</button>
				<button
					className={`p-2 rounded ${acStatus?.mode === "1" ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"} text-sm`}
					onClick={() => sendCommand({ category_id: 5, key_id: 1, key: "M1" })}>
					<span>Cool</span>
				</button>
				<button
					className={`p-2 rounded ${acStatus?.mode === "2" ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"} text-sm`}
					onClick={() => sendCommand({ category_id: 5, key_id: 1, key: "M2" })}>
					<span>Dry</span>
				</button>
				<button
					className={`p-2 rounded ${!acStatus?.powerOpen ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"} text-sm`}
					onClick={() => sendCommand({ category_id: 5, key_id: 2, key: "PWR" })}>
					<span>Power</span>
				</button>
			</div>
		</div>
	);
};
