import React, { useState } from "react";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import * as Icons from "lucide-react";

interface BluetoothDevice {
	id: string;
	name: string;
	isPaired: boolean;
}

export const BluetoothController: React.FC = () => {
	const [isEnabled, setIsEnabled] = useState(true);
	const [devices, setDevices] = useState<BluetoothDevice[]>([
		{ id: "1", name: "iPhone 123", isPaired: true },
		{ id: "2", name: "iPhone 456", isPaired: true },
		{ id: "3", name: "iPhone 789", isPaired: false },
		{ id: "4", name: "iPhone XYZ", isPaired: false },
	]);

	const togglePair = (id: string) => {
		setDevices(
			devices.map((device) =>
				device.id === id ? { ...device, isPaired: !device.isPaired } : device,
			),
		);
	};

	return (
		<Card className="p-4 bg-white shadow-lg rounded-2xl">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<Icons.Bluetooth className="w-5 h-5 text-blue-600" />
					<Text as="h2" size="lg" weight="semibold">
						Bluetooth Setting
					</Text>
				</div>
				<label className="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						className="sr-only peer"
						checked={isEnabled}
						onChange={() => setIsEnabled(!isEnabled)}
					/>
					<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
				</label>
			</div>

			{isEnabled && (
				<>
					{/* Paired Devices */}
					<div className="mb-6">
						<Text as="h3" size="sm" weight="medium" className="mb-3">
							Paired Devices
						</Text>
						<div className="space-y-3">
							{devices
								.filter((d) => d.isPaired)
								.map((device) => (
									<div
										key={device.id}
										className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
										<div className="flex items-center space-x-3">
											<Icons.Bluetooth className="w-4 h-4 text-blue-600" />
											<Text size="sm">{device.name}</Text>
										</div>
										<button
											onClick={() => togglePair(device.id)}
											className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
											<Icons.X className="w-4 h-4 text-gray-500" />
										</button>
									</div>
								))}
						</div>
					</div>

					{/* Available Devices */}
					<div>
						<div className="flex items-center justify-between mb-3">
							<Text as="h3" size="sm" weight="medium">
								Available Devices
							</Text>
							<button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
								<Icons.RefreshCw className="w-4 h-4 text-gray-500" />
							</button>
						</div>
						<div className="space-y-3">
							{devices
								.filter((d) => !d.isPaired)
								.map((device) => (
									<div
										key={device.id}
										className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
										<div className="flex items-center space-x-3">
											<Icons.Bluetooth className="w-4 h-4 text-gray-400" />
											<Text size="sm">{device.name}</Text>
										</div>
										<button
											onClick={() => togglePair(device.id)}
											className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
											Pair
										</button>
									</div>
								))}
						</div>
					</div>
				</>
			)}
		</Card>
	);
};

export default BluetoothController;
