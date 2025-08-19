import React from "react";
import { Header } from "../../components/molecules/shared/Header";
import { Navigation } from "../../components/molecules/shared/Navigation";
import { LightsController } from "../../components/molecules/controllers/LightsController";
import { ACTuyaController } from "../../components/molecules/controllers/ACTuyaController";
import { CurtainsController } from "../../components/molecules/controllers/CurtainsController";
import { RoomPreferences } from "../../components/molecules/controllers/RoomPreferences";
import { AppsPanel } from "../../components/molecules/controllers/AppsPanel";
import { TVController } from "../../components/molecules/controllers/TVController";
import { TuyaIRController } from "../../components/molecules/controllers/TuyaIRController";
import { ControlsPageTemplate } from "../../components/templates";

export const ControlsPage: React.FC = () => {
	return (
		<ControlsPageTemplate>
			{/* Main Content */}
			{/* Row 1: AC, TV, Apps (1 / 2 / 3 columns) */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
				<ACTuyaController />
				<TVController />
				<AppsPanel />
			</div>

			{/* Row 2: Lights (2/3) and Curtains (1/3) to match Apps width */}
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4 items-stretch">
				<div className="xl:col-span-2 flex">
					<div className="flex-1">
						<LightsController />
					</div>
				</div>
				<div className="xl:col-span-1 flex">
					<div className="flex-1">
						<CurtainsController />
					</div>
				</div>
			</div>

			{/* Row 3: Services full-width */}
			<div className="grid grid-cols-1 gap-4">
				<RoomPreferences />
			</div>
		</ControlsPageTemplate>
	);
};

export default ControlsPage;
