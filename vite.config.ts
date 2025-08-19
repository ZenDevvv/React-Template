import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
	plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./app"),
			app: path.resolve(__dirname, "./app"),
		},
	},
	server: {
		port: 8080,
		proxy: {
			"/api": {
				target: "https://onebis-dms-api-dev-cf341f72994f.herokuapp.com",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
