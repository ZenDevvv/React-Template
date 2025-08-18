import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import { Lightbulb } from "lucide-react";

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

	// Split lights into two columns with three items each
	const leftColumn = lights.slice(0, 3);
	const rightColumn = lights.slice(3);

	return (
		<Card className="p-6 h-full">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<Lightbulb className="w-5 h-5 text-blue-600" />
					<Text as="h2" size="lg" weight="semibold">
						Ambiance
					</Text>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-8">
					{leftColumn.map((light) => (
						<div key={light.id}>
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center space-x-2">
									<span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
									<Text weight="medium">{light.name}</Text>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={light.isOn}
										onChange={() => toggleLight(light.id)}
									/>
									<div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>
							<Text size="sm" variant="muted">
								Brightness
							</Text>
							<div className="flex items-center space-x-3">
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
										background: `linear-gradient(to right, #111827 0%, #111827 ${light.brightness}%, #e5e7eb ${light.brightness}%, #e5e7eb 100%)`,
									}}
								/>
								<Text size="sm" className="w-10 text-right">
									{light.brightness}%
								</Text>
							</div>
						</div>
					))}
				</div>

				<div className="space-y-8">
					{rightColumn.map((light) => (
						<div key={light.id}>
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center space-x-2">
									<span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
									<Text weight="medium">{light.name}</Text>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										className="sr-only peer"
										checked={light.isOn}
										onChange={() => toggleLight(light.id)}
									/>
									<div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>
							<Text size="sm" variant="muted">
								Brightness
							</Text>
							<div className="flex items-center space-x-3">
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
										background: `linear-gradient(to right, #111827 0%, #111827 ${light.brightness}%, #e5e7eb ${light.brightness}%, #e5e7eb 100%)`,
									}}
								/>
								<Text size="sm" className="w-10 text-right">
									{light.brightness}%
								</Text>
							</div>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
};

export default LightsController;
