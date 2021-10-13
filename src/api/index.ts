import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

export const DATABASE_URL = import.meta.env.VITE_DATABASE_URL as string;

export const api = async (
	request: Request<Locals>,
	query?: GraphQLQuery
): Promise<GraphQLResponse & { status: number }> => {
	if (!request.locals.userid) {
		return {
			status: 401,
			data: null,
			errors: [{ message: 'User not authenticated.' }]
		};
	}

	const response = await fetch(DATABASE_URL, {
		method: 'POST',
		headers: {
			authorization: `Bearer ${import.meta.env.VITE_DATABASE_TOKEN}`,
			'content-type': 'application/json',
			accept: 'application/json',
			'X-Schema-Preview': 'partial-update-mutation'
		},
		body: query && JSON.stringify(query)
	});

	const { data, errors } = await response.json();

	return {
		status: response.status,
		data,
		errors
	};
};
