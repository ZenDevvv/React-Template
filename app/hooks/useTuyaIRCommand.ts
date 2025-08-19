import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tuyaIRService } from "../services/tuyaIRService";
import React from "react";

interface TuyaIRCommandParams {
	category_id: number;
	key_id: number;
	key: string;
}

export interface ACStatus {
	devId: string;
	powerOpen: boolean;
	mode: string;
	temp: string;
	fan: string;
	swing: string;
}

interface APIResponse {
	success: boolean;
	message: string;
	result: ACStatus[];
}

export const useTuyaIRCommand = (deviceId: string) => {
	const queryClient = useQueryClient();
	let disposed = false;

	const { data: acStatus, isLoading: isLoadingStatus } = useQuery<ACStatus, Error>({
		queryKey: ["ac-status", deviceId],
		queryFn: async () => {
			const response = await tuyaIRService.getACStatus([deviceId]);
			const raw = response?.result?.[0] ?? {};
			const coerceBool = (v: unknown): boolean => {
				if (typeof v === "boolean") return v;
				if (typeof v === "number") return v !== 0;
				if (typeof v === "string")
					return ["1", "true", "on", "yes"].includes(v.toLowerCase());
				return false;
			};
			const powerCandidates = [
				raw.powerOpen,
				raw.power_open,
				raw.powerOn,
				raw.power_on,
				raw.power,
			];
			const firstDefined = powerCandidates.find((v) => v !== undefined);
			const mapped: ACStatus = {
				devId: raw.devId || raw.device_id || deviceId,
				powerOpen: coerceBool(firstDefined),
				mode: String(raw.mode ?? raw.work_mode ?? raw.workMode ?? ""),
				temp: String(raw.temp ?? raw.temperature ?? ""),
				fan: String(raw.fan ?? raw.wind ?? raw.fan_speed ?? ""),
				swing: String(raw.swing ?? raw.swing_mode ?? ""),
			};
			return mapped;
		},
		refetchOnWindowFocus: false,
		refetchInterval: undefined,
		retry: false,
	});

	const { mutate: sendCommand, isPending: isSendingCommand } = useMutation({
		mutationFn: (params: TuyaIRCommandParams) => tuyaIRService.sendCommand(params),
		onSuccess: () => {
			if (!disposed) {
				queryClient.invalidateQueries({ queryKey: ["ac-status", deviceId] });
			}
		},
	});

	// Mark disposed on unmount so onSuccess/async work won’t run
	// Note: this local flag is safe since the hook instance unmounts with the page
	// and react-query itself avoids updating unmounted components.
	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(
		() => () => {
			disposed = true;
		},
		[],
	);

	return {
		acStatus,
		isLoadingStatus,
		sendCommand,
		isSendingCommand,
	};
};
