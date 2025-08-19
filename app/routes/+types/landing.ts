export namespace Route {
	export type MetaArgs = {
		params: Record<string, string>;
		data: any;
		location: { pathname: string; search: string; hash: string };
	};
	export type LoaderArgs = {
		params: Record<string, string>;
		request: Request;
	};
}
