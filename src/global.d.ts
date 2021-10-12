/// <reference types="@sveltejs/kit" />

export {};

declare global {
	type GraphQLQuery = {
		query: string;
		variables: Record<string, string>;
	};
}
