import React, { useCallback, useEffect } from "react";
import { useTuyaIRCommand } from "../../../hooks/useTuyaIRCommand";
import debounce from "lodash/debounce";
import * as Icons from "lucide-react";

const DEVICE_ID = "ebd03d60a10029efb4bryq";

export const ACTuyaController: React.FC = () => {
	const { acStatus, isLoadingStatus, sendCommand, isSendingCommand } =
		useTuyaIRCommand(DEVICE_ID);

	// Mode metadata for a cleaner, modern UI
	type ModeOption = {
		id: string;
		name: string;
		key: string;
		key_id: number;
		icon: React.ReactNode;
	};
	const modes: ModeOption[] = [
		{
			id: "2",
			name: "Auto",
			key: "M2",
			key_id: 0,
			icon: <Icons.RotateCcw className="w-4 h-4" />,
		},
		{
			id: "0",
			name: "Cool",
			key: "M0",
			key_id: 0,
			icon: <Icons.Snowflake className="w-4 h-4" />,
		},
		{ id: "1", name: "Heat", key: "M1", key_id: 0, icon: <Icons.Flame className="w-4 h-4" /> },
		{
			id: "4",
			name: "Dry",
			key: "M4",
			key_id: 0,
			icon: <Icons.Droplets className="w-4 h-4" />,
		},
		{ id: "3", name: "Fan", key: "M3", key_id: 0, icon: <Icons.Wind className="w-4 h-4" /> },
	];

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

	// Cancel pending debounce on unmount
	useEffect(() => {
		return () => {
			(debouncedSendTemp as any).cancel?.();
		};
	}, [debouncedSendTemp]);

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
		<div className="bg-white shadow-lg rounded-2xl p-4">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<Icons.Thermometer className="w-5 h-5 text-blue-600" />
					<h3 className="text-lg font-semibold">Air Conditioner</h3>
				</div>
				<button
					aria-label="Toggle power"
					onClick={() =>
						sendCommand({
							category_id: 5,
							key_id: 0,
							key: acStatus?.powerOpen ? "PowerOff" : "PowerOn",
						})
					}
					disabled={isSendingCommand}
					className={`p-2 rounded-full transition-colors ${
						acStatus?.powerOpen
							? "bg-green-100 text-green-600"
							: "bg-gray-100 text-gray-400"
					}
					${isSendingCommand ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}>
					<Icons.Power className="w-4 h-4" />
				</button>
			</div>

			<div className="text-center mb-8">
				<div className="text-5xl font-bold text-gray-800 mb-4">
					{acStatus?.temp || "--"}°C
				</div>
				<div className="flex justify-center space-x-6">
					<button
						className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-colors ${
							acStatus?.powerOpen && !isSendingCommand
								? "bg-gray-100 hover:bg-gray-200 text-gray-700"
								: "bg-gray-50 text-gray-400 cursor-not-allowed"
						}`}
						onClick={() => handleTempChange(false)}
						disabled={isSendingCommand || !acStatus?.powerOpen}>
						-
					</button>
					<button
						className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-colors ${
							acStatus?.powerOpen && !isSendingCommand
								? "bg-gray-100 hover:bg-gray-200 text-gray-700"
								: "bg-gray-50 text-gray-400 cursor-not-allowed"
						}`}
						onClick={() => handleTempChange(true)}
						disabled={isSendingCommand || !acStatus?.powerOpen}>
						+
					</button>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-4">
				{modes.map((mode) => (
					<button
						key={mode.id}
						onClick={() =>
							sendCommand({ category_id: 5, key_id: mode.key_id, key: mode.key })
						}
						disabled={isSendingCommand}
						className={`p-4 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
							acStatus?.mode === mode.id
								? "bg-blue-100 text-blue-600"
								: "bg-white border border-gray-200 text-gray-700"
						}
						${isSendingCommand ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>
						{mode.icon}
						<span className="text-xs font-medium">{mode.name}</span>
					</button>
				))}
				<button
					aria-label="Toggle power"
					onClick={() =>
						sendCommand({
							category_id: 5,
							key_id: 0,
							key: acStatus?.powerOpen ? "PowerOff" : "PowerOn",
						})
					}
					disabled={isSendingCommand}
					className={`p-4 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
						acStatus?.powerOpen
							? "bg-green-100 text-green-600"
							: "bg-white border border-gray-200 text-gray-700"
					}
					${isSendingCommand ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}>
					<Icons.Power className="w-4 h-4" />
					<span className="text-xs font-medium">Power</span>
				</button>
			</div>
		</div>
	);
};
