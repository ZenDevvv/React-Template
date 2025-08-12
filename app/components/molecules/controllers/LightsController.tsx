import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import { Lightbulb, Edit2, Moon, Sun } from "lucide-react";

interface LightSetting {
	id: string;
	name: string;
	schedule: string;
	brightness: number;
	isOn: boolean;
}

export const LightsController: React.FC = () => {
	const [lights, setLights] = useState<LightSetting[]>([
		{
			id: "reading",
			name: "Reading Light",
			schedule: "Every 7pm",
			brightness: 70,
			isOn: false,
		},
		{
			id: "bathroom",
			name: "Bathroom Light",
			schedule: "Every 7pm",
			brightness: 80,
			isOn: false,
		},
		{
			id: "balcony",
			name: "Balcony Light",
			schedule: "Every 7pm",
			brightness: 60,
			isOn: false,
		},
		{
			id: "relax",
			name: "Relax Light Setting",
			schedule: "Every 7pm",
			brightness: 40,
			isOn: false,
		},
		{
			id: "bright",
			name: "Bright Light Setting",
			schedule: "Every 7pm",
			brightness: 100,
			isOn: false,
		},
		{
			id: "night",
			name: "Night Light Setting",
			schedule: "Every 7pm",
			brightness: 20,
			isOn: false,
		},
	]);

	const toggleLight = (id: string) => {
		setLights(
			lights.map((light) => (light.id === id ? { ...light, isOn: !light.isOn } : light)),
		);
	};

	const updateBrightness = (id: string, value: number) => {
		setLights(
			lights.map((light) => (light.id === id ? { ...light, brightness: value } : light)),
		);
	};

	return (
		<Card className="p-6 bg-white shadow-lg rounded-2xl">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<Lightbulb className="w-5 h-5 text-blue-600" />
					<Text as="h2" size="lg" weight="semibold">
						Lights
					</Text>
				</div>
			</div>

			<div className="space-y-6">
				{lights.map((light) => (
					<div key={light.id} className="space-y-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<Text weight="medium">{light.name}</Text>
								<div className="flex items-center text-xs text-gray-500 space-x-2">
									<Text size="xs" variant="muted">
										{light.schedule}
									</Text>
									<button className="text-blue-600 hover:text-blue-700">
										<Edit2 className="w-3 h-3" />
									</button>
								</div>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									className="sr-only peer"
									checked={light.isOn}
									onChange={() => toggleLight(light.id)}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
						<div className="flex items-center space-x-3">
							<Moon className="w-4 h-4 text-gray-400" />
							<input
								type="range"
								min="0"
								max="100"
								value={light.brightness}
								onChange={(e) =>
									updateBrightness(light.id, parseInt(e.target.value))
								}
								className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
								style={{
									background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${light.brightness}%, #e5e7eb ${light.brightness}%, #e5e7eb 100%)`,
								}}
							/>
							<Sun className="w-4 h-4 text-gray-400" />
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};

export default LightsController;
