"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._decodeClientDataJSONInternals = exports.decodeClientDataJSON = void 0;
const index_js_1 = require("./iso/index.js");
/**
 * Decode an authenticator's base64url-encoded clientDataJSON to JSON
 */
function decodeClientDataJSON(data) {
    const toString = index_js_1.isoBase64URL.toString(data);
    const clientData = JSON.parse(toString);
    return exports._decodeClientDataJSONInternals.stubThis(clientData);
}
exports.decodeClientDataJSON = decodeClientDataJSON;
// Make it possible to stub the return value during testing
exports._decodeClientDataJSONInternals = {
    stubThis: (value) => value,
};
