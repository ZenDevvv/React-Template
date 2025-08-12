import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
	index("pages/guest/WelcomePage.tsx"),
	route("home", "pages/guest/HomePage.tsx"),
	route("controls", "pages/guest/ControlsPage.tsx"),
	route("entertainment", "pages/guest/EntertainmentPage.tsx"),
	route("dining", "pages/guest/DiningPage.tsx"),
	route("reservations", "pages/guest/ReservationsPage.tsx"),
	route("operator", "pages/guest/OperatorPage.tsx"),
	route("signout", "pages/guest/SignOutPage.tsx"),
] satisfies RouteConfig;
