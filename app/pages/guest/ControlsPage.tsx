import React from "react";
import { Header } from "../../components/molecules/Header";
import { HorizontalNav } from "../../components/molecules/HorizontalNav";
import { LightsController } from "../../components/molecules/controllers/LightsController";
import { ACTuyaController } from "../../components/molecules/controllers/ACTuyaController";
import { BluetoothController } from "../../components/molecules/controllers/BluetoothController";
import { CurtainsController } from "../../components/molecules/controllers/CurtainsController";
import { DoorController } from "../../components/molecules/controllers/DoorController";
import { RoomPreferences } from "../../components/molecules/controllers/RoomPreferences";
import { AppsPanel } from "../../components/molecules/controllers/AppsPanel";
import { TVController } from "../../components/molecules/controllers/TVController";
import { TuyaIRController } from "../../components/molecules/controllers/TuyaIRController";

export const ControlsPage: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<Header />

			{/* Navigation */}
			<HorizontalNav />

			{/* Main Content */}
			<div className="container mx-auto px-4 py-4 min-h-[calc(100vh-8rem)] overflow-y-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{/* Left Column - Main Controls */}
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<ACTuyaController />
							<TVController />
						</div>
						<LightsController />
					</div>

					{/* Middle Column - Room Controls */}
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<BluetoothController />
							<DoorController />
						</div>
						<CurtainsController />
						<TuyaIRController />
					</div>

					{/* Right Column - Services & Apps */}
					<div className="space-y-4">
						<RoomPreferences />
						<AppsPanel />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ControlsPage;
