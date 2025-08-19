import React from "react";
import HomeMain from "../organisms/HomeMain";

export const HomeTemplate: React.FC = () => {
	return (
		<div className="flex flex-col flex-1 p-4 sm:p-6 space-y-6 min-h-0">
			<HomeMain />
		</div>
	);
};

export default HomeTemplate;
