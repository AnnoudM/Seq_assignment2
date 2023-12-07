/**
 * Decode an authenticator's base64url-encoded clientDataJSON to JSON
 */
export declare function decodeClientDataJSON(data: string): ClientDataJSON;
export type ClientDataJSON = {
    type: string;
    challenge: string;
    origin: string;
    crossOrigin?: boolean;
    tokenBinding?: {
        id?: string;
        status: 'present' | 'supported' | 'not-supported';
    };
};
export declare const _decodeClientDataJSONInternals: {
    stubThis: (value: ClientDataJSON) => ClientDataJSON;
};
