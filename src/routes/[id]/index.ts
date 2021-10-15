import type { ServerRequest } from '@sveltejs/kit/types/hooks';

import { api } from '$api';
import { GET_SHORT, VISIT_SHORT } from '$api/queries';
import type { Locals } from '$lib/types';
import { getShortLink } from '$utils';

export const get = async (
	request: ServerRequest<Locals>
): Promise<{ status: number; body?: string; headers?: Record<string, string> }> => {
	const { data, errors } = await api(request, {
		query: GET_SHORT,
		variables: {
			id: request.params.id
		}
	});

	if (errors) {
		return {
			status: 500,
			headers: {
				'content-type': 'text/plain'
			},
			body: errors[0]?.message || 'Internal Server Error'
		};
	}

	if (!data?.short) {
		return {
			status: 302,
			headers: {
				'content-length': '0',
				location: getShortLink('/')
			}
		};
	}

	await api(request, {
		query: VISIT_SHORT,
		variables: {
			id: request.params.id
		}
	});

	const { target, proxy } = data.short as { target: string; proxy: boolean };

	if (!proxy) {
		return {
			status: 301,
			headers: {
				'content-length': '0',
				location: target
			}
		};
	}

	const res = await fetch(target);

	if (!res.ok) {
		return {
			status: 302,
			headers: {
				'content-length': '0',
				location: getShortLink('/')
			}
		};
	}

	return {
		status: res.status,
		headers: {
			'content-type': res.headers.get('content-type')
		},
		body: await res.text()
	};
};
