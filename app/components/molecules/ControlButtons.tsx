import React from "react";
import { Clock, Lock, Lightbulb } from "lucide-react";

interface ControlButtonProps {
	icon: React.ReactNode;
	onClick?: () => void;
}

const ControlButton: React.FC<ControlButtonProps> = ({ icon, onClick }) => (
	<button
		onClick={onClick}
		className="p-4 rounded-lg bg-orange-400 hover:bg-orange-500 transition-colors flex items-center justify-center">
		<div className="text-white">{icon}</div>
	</button>
);

export const ControlButtons: React.FC = () => {
	return (
		<div className="grid grid-cols-3 gap-3">
			<ControlButton
				icon={<Clock className="w-6 h-6" />}
				onClick={() => console.log("Timer clicked")}
			/>
			<ControlButton
				icon={<Lock className="w-6 h-6" />}
				onClick={() => console.log("Lock clicked")}
			/>
			<ControlButton
				icon={<Lightbulb className="w-6 h-6" />}
				onClick={() => console.log("Light clicked")}
			/>
		</div>
	);
};

export default ControlButtons;
