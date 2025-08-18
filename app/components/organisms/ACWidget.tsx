import React, { useState, useEffect, useCallback } from "react";
import { Thermometer, Power } from "lucide-react";
import { Text } from "~/components/ui/text";
import { useTuyaIRCommand } from "~/hooks/useTuyaIRCommand";
import { DEVICE_IDS } from "~/services/tuyaIRService";
import debounce from "lodash/debounce";

interface ACWidgetProps {}

const ACWidget: React.FC<ACWidgetProps> = () => {
	const [localTemp, setLocalTemp] = useState(19);
	const [isOn, setIsOn] = useState(false);
	const [currentMode, setCurrentMode] = useState("Auto");
	const [isDragging, setIsDragging] = useState(false);

	// Semi-circle geometry
	const cx = 120;
	const cy = 120;
	const radius = 100;
	const circumference = Math.PI * radius;

	// Map temperature to progress (16-30°C)
	const minTemp = 16;
	const maxTemp = 30;
	const clamped = Math.min(Math.max(localTemp, minTemp), maxTemp);
	const t = (clamped - minTemp) / (maxTemp - minTemp);

	// Angle from -PI to 0
	const angle = -Math.PI + t * Math.PI;
	const pointerX = cx + radius * Math.cos(angle);
	const pointerY = cy + radius * Math.sin(angle);

	const bgPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

	const { acStatus, isLoadingStatus, sendCommand, isSendingCommand } = useTuyaIRCommand(
		DEVICE_IDS.AC.remoteId,
	);

	// Sync widget with actual AC status
	useEffect(() => {
		if (acStatus) {
			if (acStatus.temp) setLocalTemp(parseInt(acStatus.temp));
			if (typeof acStatus.powerOpen === "boolean") setIsOn(acStatus.powerOpen);
			if (acStatus.mode !== undefined) {
				const modeMap: Record<string, string> = {
					"0": "Auto",
					"1": "Cool",
					"2": "Dry",
					"3": "Sleep",
					"4": "ION",
				};
				setCurrentMode(modeMap[acStatus.mode] || currentMode);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [acStatus?.temp, acStatus?.powerOpen, acStatus?.mode]);

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

	const handlePowerToggle = () => {
		sendCommand({
			category_id: 5,
			key_id: 0,
			key: isOn ? "PowerOff" : "PowerOn",
		});
		setIsOn((prev) => !prev);
	};

	const handleModeChange = (mode: string) => {
		if (!isOn) return;
		const modeMap: { [key: string]: string } = { Auto: "M0", Cool: "M1", Dry: "M2" };

		sendCommand({
			category_id: 5,
			key_id: 1,
			key: modeMap[mode],
		});
		setCurrentMode(mode);
	};

	const calculateTemperature = (clientX: number, clientY: number, rect: DOMRect) => {
		const x = clientX - rect.left - cx;
		const y = clientY - rect.top - cy;
		const angle = Math.atan2(y, x);
		let newTemp = Math.round(((angle + Math.PI) / Math.PI) * (maxTemp - minTemp) + minTemp);
		return Math.max(minTemp, Math.min(maxTemp, newTemp));
	};

	const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
		if (!isOn) return;
		setIsDragging(true);
		const newTemp = calculateTemperature(
			e.clientX,
			e.clientY,
			e.currentTarget.getBoundingClientRect(),
		);
		setLocalTemp(newTemp);
	};

	const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
		if (!isDragging || !isOn) return;
		const newTemp = calculateTemperature(
			e.clientX,
			e.clientY,
			e.currentTarget.getBoundingClientRect(),
		);
		setLocalTemp(newTemp);
		debouncedSendTemp(newTemp);
	};

	const handleMouseUp = () => {
		if (isDragging) {
			setIsDragging(false);
			debouncedSendTemp(localTemp);
		}
	};

	// Add global mouse up handler
	useEffect(() => {
		const handleGlobalMouseUp = () => setIsDragging(false);
		if (isDragging) {
			window.addEventListener("mouseup", handleGlobalMouseUp);
			return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
		}
		return undefined;
	}, [isDragging]);

	return (
		<div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col items-center h-[300px] justify-between">
			{/* Header with controls */}
			<div className="flex items-center justify-between w-full mb-4">
				<div className="flex items-center space-x-2">
					<Thermometer className="w-5 h-5 text-pink-400" />
					<Text as="span" size="xs" variant="muted">
						Climate
					</Text>
				</div>
				<button
					onClick={handlePowerToggle}
					disabled={isSendingCommand}
					className={`p-2 rounded-full transition-colors ${
						isOn ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
					} ${isSendingCommand ? "opacity-50 cursor-not-allowed" : ""}`}>
					<Power className="w-4 h-4" />
				</button>
			</div>

			{/* Semi-circular Temperature Gauge */}
			<div className="relative mb-2">
				<svg
					width={cx * 2}
					height={cy + 10}
					viewBox={`0 0 ${cx * 2} ${cy + 10}`}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					className={`cursor-${isOn ? "pointer" : "not-allowed"} select-none`}>
					{/* Background arc */}
					<path
						d={bgPath}
						stroke="#f1f2f4"
						strokeWidth={18}
						fill="none"
						strokeLinecap="round"
					/>

					{/* Progress arc - coral */}
					<path
						d={bgPath}
						stroke={isOn ? "#ff7f6b" : "#e5e7eb"}
						strokeWidth={18}
						fill="none"
						strokeLinecap="round"
						strokeDasharray={`${circumference * t} ${circumference}`}
						className="transition-all duration-200"
					/>

					{/* Pointer dot at arc end */}
					<circle
						cx={pointerX}
						cy={pointerY}
						r={8}
						fill={isOn ? "#ff7f6b" : "#e5e7eb"}
						className="transition-all duration-200"
					/>
					<circle cx={pointerX} cy={pointerY} r={4} fill="#fff" />

					{/* Temperature in center */}
					<text
						x={cx}
						y={cy - 10}
						textAnchor="middle"
						className={isOn ? "fill-gray-700" : "fill-gray-400"}
						fontWeight={700}
						fontSize={36}>
						{localTemp}°C
					</text>
				</svg>
			</div>

			{/* Mode buttons */}
			<div className="flex items-center justify-between text-center w-full">
				<button
					onClick={() => handleModeChange("Auto")}
					disabled={!isOn}
					className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
						currentMode === "Auto" && isOn
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700"
					}`}>
					Auto
				</button>
				<button
					onClick={() => handleModeChange("Cool")}
					disabled={!isOn}
					className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
						currentMode === "Cool" && isOn
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700"
					}`}>
					Cool
				</button>
				<button
					onClick={() => handleModeChange("Dry")}
					disabled={!isOn}
					className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
						currentMode === "Dry" && isOn
							? "bg-blue-600 text-white"
							: "bg-gray-200 text-gray-700"
					}`}>
					Dry
				</button>
			</div>
		</div>
	);
};

export default ACWidget;
