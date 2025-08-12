import React from "react";
import NavigationMenu from "../../components/molecules/NavigationMenu";

export const ReservationsPage: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-4xl font-bold mb-4">Reservations</h1>
			<NavigationMenu />
		</div>
	);
};

export default ReservationsPage;
