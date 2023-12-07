import { isoBase64URL } from './iso/index.js';
/**
 * Decode an authenticator's base64url-encoded clientDataJSON to JSON
 */
export function decodeClientDataJSON(data) {
    const toString = isoBase64URL.toString(data);
    const clientData = JSON.parse(toString);
    return _decodeClientDataJSONInternals.stubThis(clientData);
}
// Make it possible to stub the return value during testing
export const _decodeClientDataJSONInternals = {
    stubThis: (value) => value,
};
