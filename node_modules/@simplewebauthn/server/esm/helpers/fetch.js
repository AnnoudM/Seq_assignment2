import { crossFetch } from '../deps.js';
/**
 * A simple method for requesting data via standard `fetch`. Should work
 * across multiple runtimes.
 */
export function fetch(url) {
    return _fetchInternals.stubThis(url);
}
// Make it possible to stub the return value during testing
export const _fetchInternals = {
    stubThis: (url) => crossFetch(url),
};
