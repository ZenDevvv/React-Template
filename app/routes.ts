import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	layout("layouts/main-layout.tsx", [
		index("pages/guest/WelcomePage.tsx"),
		route("home", "pages/guest/HomePage.tsx"),
		route("controls", "pages/guest/ControlsPage.tsx"),
		route("entertainment", "pages/guest/EntertainmentPage.tsx"),
		route("dining", "pages/guest/DiningPage.tsx"),
		route("cart", "pages/guest/CartPage.tsx"),
		route("order-status", "pages/guest/OrderStatusPage.tsx"),
		route("reservations", "pages/guest/ReservationsPage.tsx"),
		route("operator", "pages/guest/OperatorPage.tsx"),
		route("signout", "pages/guest/SignOutPage.tsx"),
	]),
	route("admin/dashboard", "pages/admin/DashboardPage.tsx"),
	route("admin/devices", "pages/admin/DevicesPage.tsx"),
	route("admin/dining", "pages/admin/DiningPage.tsx"),
	route("admin/rooms", "pages/admin/RoomsPage.tsx"),
	route("admin/maintenance", "pages/admin/MaintenancePage.tsx"),
] satisfies RouteConfig;
