import React from "react";
import { useTuyaIRCommand } from "../../../hooks/useTuyaIRCommand";
import { DEVICE_IDS } from "../../../services/tuyaIRService";

interface TuyaIRControllerProps {
	categoryId?: number;
}

export const TuyaIRController: React.FC<TuyaIRControllerProps> = ({ categoryId = 5 }) => {
	const { sendCommand, isSendingCommand } = useTuyaIRCommand(DEVICE_IDS.AC.remoteId);

	const handleCommand = (keyId: number, key: string) => {
		sendCommand({
			category_id: categoryId,
			key_id: keyId,
			key: key,
		});
	};

	return (
		<div className="bg-white rounded-lg shadow p-4">
			<h3 className="text-lg font-semibold mb-4">IR Remote Control</h3>
			<div className="grid grid-cols-3 gap-2">
				<button
					className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
						isSendingCommand ? "opacity-50 cursor-not-allowed" : ""
					}`}
					onClick={() => handleCommand(0, "T26")}
					disabled={isSendingCommand}>
					T26
				</button>
				{/* Add more buttons as needed */}
			</div>
		</div>
	);
};
