import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { Locals } from '$lib/types';

import { api } from '$api';
import { CREATE_SHORT, GET_SHORTS } from '$api/queries';
import { generateID, testURLFormat } from '$utils';

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
	const parsedTTL = parseInt(request.body.get('ttl'), 10);
	const { id, proxy, target, ttl, user } = {
		id: request.body.get('id') || generateID(),
		proxy: !!request.body.get('proxy'),
		target: request.body.get('url'),
		ttl: !isNaN(parsedTTL) ? parsedTTL : null,
		user: request.locals.userid
	};

	if (!testURLFormat(target)) {
		return {
			status: 400,
			body: {
				data: null,
				errors: [
					{
						message: 'Invalid URL format.'
					}
				]
			}
		};
	}

	const { status, data, errors } = await api(request, {
		query: CREATE_SHORT,
		variables: {
			data: {
				id,
				proxy,
				target,
				ttl,
				user
			}
		}
	});

	if (errors) {
		console.error(errors);
	}

	return { status, body: { data, errors } };
};
