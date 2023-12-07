/**
 * A simple method for requesting data via standard `fetch`. Should work
 * across multiple runtimes.
 */
export declare function fetch(url: string): Promise<Response>;
export declare const _fetchInternals: {
    stubThis: (url: string) => Promise<Response>;
};
