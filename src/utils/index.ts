import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import updateLocale from 'dayjs/plugin/updateLocale.js';
import { uid } from 'uid/single';

export const ID_DEFAULT_LENGTH = 8;

// https://urlregex.com
export const URL_REGEXP =
	/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/;

export const defer = (
	fn: (...params: unknown[]) => void,
	timeout = 300
): ((...params: unknown[]) => void) => {
	let timeoutId = null;
	return (...params: unknown[]) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...params), timeout);
	};
};

export const generateID = (len = ID_DEFAULT_LENGTH): string => uid(len);

export const getRelativeTime = (t: string): [string, string] => {
	dayjs.extend(localizedFormat);
	dayjs.extend(relativeTime);
	dayjs.extend(updateLocale);
	dayjs.updateLocale('en', {
		relativeTime: {
			future: '%s',
			past: '%s',
			s: '1sec',
			m: '1min',
			mm: '%dmin',
			h: '1hr',
			hh: '%dhr',
			d: '1d',
			dd: '%dd',
			M: '1m',
			MM: '%dm',
			y: '1y',
			yy: '%dy'
		}
	});
	const min = dayjs(t).fromNow();
	const max = dayjs(t).format('LL LT');

	return [min, max];
};

export const getShortLink = (id: string): string =>
	new URL(id, import.meta.env.VITE_BASE_URL as string).toString();

export const handleCopyToClipboard = async (
	e: MouseEvent,
	id: string,
	cb?: () => void | Promise<void>
): Promise<void> => {
	e.preventDefault();

	const url = getShortLink(id);
	await navigator.clipboard.writeText(url);

	return typeof cb === 'function' && cb();
};

export const testURLFormat = (input: string): boolean => URL_REGEXP.test(input);
