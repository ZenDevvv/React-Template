import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import * as Icons from "lucide-react";

interface ACMode {
	id: string;
	name: string;
	icon: React.ReactNode;
}

export const ACController: React.FC = () => {
	const [isOn, setIsOn] = useState(true);
	const [temperature, setTemperature] = useState(18);
	const [activeMode, setActiveMode] = useState("auto");

	const modes: ACMode[] = [
		{ id: "auto", name: "Auto", icon: <Icons.RotateCcw className="w-4 h-4" /> },
		{ id: "cool", name: "Cool", icon: <Icons.Snowflake className="w-4 h-4" /> },
		{ id: "dry", name: "Dry", icon: <Icons.Wind className="w-4 h-4" /> },
		{ id: "sleep", name: "Sleep", icon: <Icons.Moon className="w-4 h-4" /> },
	];

	const [swingH, setSwingH] = useState(false);
	const [swingV, setSwingV] = useState(false);
	const [timer, setTimer] = useState(false);

	return (
		<Card className="p-4 bg-white shadow-lg rounded-2xl">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<Icons.Thermometer className="w-5 h-5 text-blue-600" />
					<Text as="h2" size="lg" weight="semibold">
						Air Conditioner
					</Text>
				</div>
				<button
					onClick={() => setIsOn(!isOn)}
					className={`p-2 rounded-full transition-colors ${
						isOn ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
					}`}>
					<Icons.Power className="w-4 h-4" />
				</button>
			</div>

			{/* Temperature Display */}
			<div className="text-center mb-8">
				<div className="text-5xl font-bold text-gray-800 mb-2">{temperature}°C</div>
				<div className="flex justify-center space-x-4">
					<button
						onClick={() => setTemperature(Math.max(16, temperature - 1))}
						disabled={!isOn}
						className={`p-2 rounded-lg transition-colors ${
							isOn
								? "bg-gray-100 hover:bg-gray-200 text-gray-600"
								: "bg-gray-50 text-gray-400"
						}`}>
						-
					</button>
					<button
						onClick={() => setTemperature(Math.min(30, temperature + 1))}
						disabled={!isOn}
						className={`p-2 rounded-lg transition-colors ${
							isOn
								? "bg-gray-100 hover:bg-gray-200 text-gray-600"
								: "bg-gray-50 text-gray-400"
						}`}>
						+
					</button>
				</div>
			</div>

			{/* Modes */}
			<div className="grid grid-cols-4 gap-3 mb-6">
				{modes.map((mode) => (
					<button
						key={mode.id}
						onClick={() => isOn && setActiveMode(mode.id)}
						className={`p-3 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
							activeMode === mode.id && isOn
								? "bg-blue-100 text-blue-600"
								: "bg-gray-50 text-gray-500"
						} ${!isOn && "opacity-50 cursor-not-allowed"}`}>
						{mode.icon}
						<Text size="xs" weight="medium">
							{mode.name}
						</Text>
					</button>
				))}
			</div>

			{/* Additional Controls */}
			<div className="grid grid-cols-3 gap-3">
				<button
					onClick={() => isOn && setSwingH(!swingH)}
					className={`p-3 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
						swingH && isOn ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-500"
					} ${!isOn && "opacity-50 cursor-not-allowed"}`}>
					<Icons.Wind className="w-4 h-4 rotate-90" />
					<Text size="xs" weight="medium">
						Swing H
					</Text>
				</button>
				<button
					onClick={() => isOn && setSwingV(!swingV)}
					className={`p-3 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
						swingV && isOn ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-500"
					} ${!isOn && "opacity-50 cursor-not-allowed"}`}>
					<Icons.Wind className="w-4 h-4" />
					<Text size="xs" weight="medium">
						Swing V
					</Text>
				</button>
				<button
					onClick={() => isOn && setTimer(!timer)}
					className={`p-3 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
						timer && isOn ? "bg-blue-100 text-blue-600" : "bg-gray-50 text-gray-500"
					} ${!isOn && "opacity-50 cursor-not-allowed"}`}>
					<Icons.Timer className="w-4 h-4" />
					<Text size="xs" weight="medium">
						Timer
					</Text>
				</button>
			</div>
		</Card>
	);
};

export default ACController;
