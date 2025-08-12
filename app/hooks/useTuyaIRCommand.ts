import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tuyaIRService } from "../services/tuyaIRService";

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

	const { data: acStatus, isLoading: isLoadingStatus } = useQuery<ACStatus, Error>({
		queryKey: ["ac-status", deviceId],
		queryFn: async () => {
			const response = await tuyaIRService.getACStatus([deviceId]);
			return response.result[0];
		},
		refetchOnWindowFocus: true,
		refetchInterval: undefined,
		retry: false,
	});

	const { mutate: sendCommand, isPending: isSendingCommand } = useMutation({
		mutationFn: (params: TuyaIRCommandParams) => tuyaIRService.sendCommand(params),
		onSuccess: () => {
			setTimeout(() => {
				queryClient.invalidateQueries({ queryKey: ["ac-status", deviceId] });
			}, 1000);
		},
	});

	return {
		acStatus,
		isLoadingStatus,
		sendCommand,
		isSendingCommand,
	};
};
