import React, { useState, useEffect, useCallback } from "react";
import { Thermometer, Power } from "lucide-react";
import { Text } from "../../ui/text";
import { Card, CardContent } from "../../ui/card";

interface ACWidgetProps {
	initialTemp?: number;
	onTemperatureChange?: (temp: number) => void;
	onPowerToggle?: (isOn: boolean) => void;
	onModeChange?: (mode: string) => void;
}

export const ACWidget: React.FC<ACWidgetProps> = ({
	initialTemp = 22,
	onTemperatureChange,
	onPowerToggle,
	onModeChange,
}) => {
	const [localTemp, setLocalTemp] = useState(initialTemp);
	const [isOn, setIsOn] = useState(true);
	const [currentMode, setCurrentMode] = useState("Auto");
	const [isDragging, setIsDragging] = useState(false);

	// Semi-circular gauge geometry (like the screenshot)
	const gaugeWidth = 300;
	const cx = gaugeWidth / 2;
	const cy = 120;
	const radius = 110;
	const circumference = Math.PI * radius; // half circle length

	// Temperature → progress (16-32°C)
	const MIN_TEMP = 16;
	const MAX_TEMP = 32;
	const t = (localTemp - MIN_TEMP) / (MAX_TEMP - MIN_TEMP);

	// Angle over top semicircle from left (π) → right (0)
	const startAngle = Math.PI;
	const endAngle = 0;

	const handlePowerToggle = () => {
		const newState = !isOn;
		setIsOn(newState);
		onPowerToggle?.(newState);
	};

	const handleModeChange = (mode: string) => {
		setCurrentMode(mode);
		onModeChange?.(mode);
	};

	// Reusable helper to compute temperature from mouse event along the semicircle
	const updateTempFromEvent = useCallback(
		(e: React.MouseEvent) => {
			if (!isOn) return;

			const svgEl = e.currentTarget as SVGSVGElement;
			const rect = svgEl.getBoundingClientRect();
			// Map from viewBox (0..gaugeWidth, 0..cy+20) to screen pixels
			const viewWidth = gaugeWidth;
			const viewHeight = cy + 20;
			const scaleX = rect.width / viewWidth;
			const scaleY = rect.height / viewHeight;
			const centerX = rect.left + cx * scaleX;
			const centerY = rect.top + cy * scaleY;
			const deltaX = e.clientX - centerX;
			const deltaY = e.clientY - centerY;
			// Project click to the semi-circular angle regardless of being above/below center
			// phi ranges 0..PI where 0 = left end, PI = right end
			const phi = Math.atan2(Math.abs(deltaY), -deltaX);

			const temperatureRange = MAX_TEMP - MIN_TEMP;
			const newTemp = Math.round(MIN_TEMP + (phi / Math.PI) * temperatureRange);
			const clampedTemp = Math.max(MIN_TEMP, Math.min(MAX_TEMP, newTemp));

			setLocalTemp(clampedTemp);
			onTemperatureChange?.(clampedTemp);
		},
		[isOn, onTemperatureChange],
	);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (!isOn) return;
			setIsDragging(true);
			updateTempFromEvent(e);
			e.preventDefault();
		},
		[isOn, updateTempFromEvent],
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging || !isOn) return;
			updateTempFromEvent(e);
		},
		[isDragging, isOn, updateTempFromEvent],
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Global mouse up handler
	useEffect(() => {
		if (isDragging) {
			const handleGlobalMouseUp = () => setIsDragging(false);
			window.addEventListener("mouseup", handleGlobalMouseUp);
			return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
		}
		return undefined;
	}, [isDragging]);

	return (
		<Card className="flex flex-col items-center justify-between h-[300px]">
			<CardContent className="w-full h-full flex flex-col">
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
						className={`p-2 rounded-full transition-colors ${
							isOn ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
						}`}>
						<Power className="w-4 h-4" />
					</button>
				</div>

				{/* Semi-circular Temperature Gauge */}
				<div className="relative mb-4 flex items-center justify-center">
					<svg
						width={gaugeWidth}
						height={cy + 20}
						viewBox={`0 0 ${gaugeWidth} ${cy + 20}`}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						className={`select-none ${isOn ? "cursor-pointer" : "cursor-not-allowed"}`}>
						{/* Background arc */}
						<path
							d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
							stroke="#f1f2f4"
							strokeWidth={18}
							fill="none"
							strokeLinecap="round"
						/>

						{/* Progress arc */}
						<path
							d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
							stroke={isOn ? "#ff7f6b" : "#e5e7eb"}
							strokeWidth={18}
							fill="none"
							strokeLinecap="round"
							strokeDasharray={`${circumference * Math.max(0, Math.min(1, t))} ${circumference}`}
							className="transition-all duration-300 ease-out"
						/>

						{/* Minimal gauge: knob removed on purpose */}

						{/* Temperature in center */}
						<text
							x={cx}
							y={cy}
							textAnchor="middle"
							className={isOn ? "fill-gray-800" : "fill-gray-400"}
							fontWeight={800}
							fontSize={40}>
							{localTemp}°C
						</text>
					</svg>
				</div>

				{/* Mode buttons */}
				<div className="flex items-center justify-center text-center w-full gap-3">
					<button
						onClick={() => handleModeChange("Auto")}
						disabled={!isOn}
						className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ring-1 ring-gray-200 shadow-sm hover:shadow ${
							currentMode === "Auto" && isOn
								? "bg-blue-600 text-white ring-blue-600"
								: "bg-white text-gray-700"
						}`}>
						Auto
					</button>
					<button
						onClick={() => handleModeChange("Cool")}
						disabled={!isOn}
						className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ring-1 ring-gray-200 shadow-sm hover:shadow ${
							currentMode === "Cool" && isOn
								? "bg-blue-600 text-white ring-blue-600"
								: "bg-white text-gray-700"
						}`}>
						Cool
					</button>
					<button
						onClick={() => handleModeChange("Dry")}
						disabled={!isOn}
						className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ring-1 ring-gray-200 shadow-sm hover:shadow ${
							currentMode === "Dry" && isOn
								? "bg-blue-600 text-white ring-blue-600"
								: "bg-white text-gray-700"
						}`}>
						Dry
					</button>
				</div>
			</CardContent>
		</Card>
	);
};

export default ACWidget;
