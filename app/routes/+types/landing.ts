import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export namespace Route {
	export type MetaArgs = Parameters<MetaFunction>[0];
	export type LoaderArgs = LoaderFunctionArgs;
}

