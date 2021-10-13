import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { Locals } from '$lib/types';

import { api } from '$api';
import { CREATE_SHORT, GET_SHORTS } from '$api/queries';
import { generateID } from '$utils';

export const get = async (
	request: ServerRequest<Locals, FormData>
): Promise<{ body: GraphQLResponse; status: number }> => {
	const variables = Object.assign(
		{
			user: request.locals.userid,
			size: 3
		},
		request.query.get('cursor') ? { cursor: request.query.get('cursor') } : {}
	);

	const { status, data, errors } = await api(request, {
		query: GET_SHORTS,
		variables
	});

	if (errors) {
		console.error(errors);
	}

	return { status, body: { data, errors } };
};

export const post = async (
	request: ServerRequest<Locals, FormData>
): Promise<{ body: GraphQLResponse; status: number }> => {
	const { status, data, errors } = await api(request, {
		query: CREATE_SHORT,
		variables: {
			data: {
				id: request.body.get('id') || generateID(),
				proxy: request.body.get('proxy'),
				target: request.body.get('url'),
				user: request.locals.userid
			}
		}
	});

	if (errors) {
		console.error(errors);
	}

	return { status, body: { data, errors } };
};
