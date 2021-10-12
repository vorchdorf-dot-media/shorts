import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const api = async (
	request: Request<Locals>,
	query?: GraphQLQuery
): Promise<{ status: number; data?: Record<string, string>; error?: string }> => {
	if (!request.locals.userid) {
		return { status: 401, error: 'User not authenticated.' };
	}

	const response = await fetch(BASE_URL, {
		method: request.method,
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			'X-Schema-Preview': 'partial-update-mutation'
		},
		body: query && JSON.stringify(query)
	});

	const { data, error } = await response.json();

	return {
		status: response.status,
		data,
		error
	};
};
