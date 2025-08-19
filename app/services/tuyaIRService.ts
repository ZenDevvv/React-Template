import axios from "axios";

interface TuyaIRCommandParams {
	category_id: number;
	key_id: number;
	key: string;
}

// Use relative base and let Vite dev proxy forward to the deployed API to avoid CORS in dev
// Environment-driven base URL.
// - Dev: defaults to Vite proxy path to avoid CORS
// - Prod: defaults to Heroku API if VITE_API_BASE isn't provided by the host
const BASE_URL =
	import.meta.env.VITE_API_BASE ||
	(import.meta.env.MODE === "production"
		? "https://onebis-dms-api-dev-cf341f72994f.herokuapp.com/api/dms"
		: "/api/dms");
export const DEVICE_IDS = {
	AC: {
		deviceId: "eb9f194920a4ae4b877qs9",
		remoteId: "ebd03d60a10029efb4bryq",
	},
	TV: {
		deviceId: "eb9f194920a4ae4b877qs9",
		remoteId: "eb2a70815ce0f3b461jxdm",
	},
};

export const tuyaIRService = {
	sendCommand: async (params: TuyaIRCommandParams, deviceType: "AC" | "TV" = "AC") => {
		const { deviceId, remoteId } = DEVICE_IDS[deviceType];
		const response = await axios.post(
			`${BASE_URL}/tuya-ir/${deviceId}/remotes/${remoteId}/command`,
			params,
		);
		return response.data;
	},

	getACStatus: async (deviceIds: string[]) => {
		// Tuya API expects infrared device IDs, not remote IDs
		const response = await axios.get(`${BASE_URL}/tuya-ir/ac/status/batch`, {
			params: { device_ids: deviceIds.join(","), _ts: Date.now() },
			headers: {
				"Cache-Control": "no-store",
				Pragma: "no-cache",
				Expires: "0",
			},
		});
		return response.data;
	},

	getDeviceProperties: async () => {
		const { remoteId } = DEVICE_IDS.AC;
		const response = await axios.get(`${BASE_URL}/tuya/devices/${remoteId}/properties`);
		return response.data?.result?.properties || [];
	},

	getRemoteKeys: async (deviceType: "AC" | "TV" = "AC") => {
		const { deviceId, remoteId } = DEVICE_IDS[deviceType];
		const response = await axios.get(
			`${BASE_URL}/tuya-ir/${deviceId}/remotes/${remoteId}/keys`,
		);
		return response.data?.result || {};
	},
};
