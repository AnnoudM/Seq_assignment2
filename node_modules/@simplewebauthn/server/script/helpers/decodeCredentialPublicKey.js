"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._decodeCredentialPublicKeyInternals = exports.decodeCredentialPublicKey = void 0;
const index_js_1 = require("./iso/index.js");
function decodeCredentialPublicKey(publicKey) {
    return exports._decodeCredentialPublicKeyInternals.stubThis(index_js_1.isoCBOR.decodeFirst(publicKey));
}
exports.decodeCredentialPublicKey = decodeCredentialPublicKey;
// Make it possible to stub the return value during testing
exports._decodeCredentialPublicKeyInternals = {
    stubThis: (value) => value,
};
