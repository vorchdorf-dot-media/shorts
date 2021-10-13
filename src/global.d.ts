/// <reference types="@sveltejs/kit" />

export {};

declare global {
	type GraphQLQuery = {
		query: string;
		variables:
			| Record<string, string | number | boolean>
			| { data: Record<string, string | number | boolean> };
	};

	type GraphQLResponse = {
		data: Record<string, unknown> | null;
		errors: [{ message: string; extensions?: Record<string, string> }] | null;
	};

	type Short = {
		id: string;
		target: string;
		proxy?: boolean;
		meta?: {
			createdAt?: string;
			visits?: string[];
			user?: string;
		};
	};
}
