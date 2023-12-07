"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._decodeAttestationObjectInternals = exports.decodeAttestationObject = void 0;
const index_js_1 = require("./iso/index.js");
/**
 * Convert an AttestationObject buffer to a proper object
 *
 * @param base64AttestationObject Attestation Object buffer
 */
function decodeAttestationObject(attestationObject) {
    return exports._decodeAttestationObjectInternals.stubThis(index_js_1.isoCBOR.decodeFirst(attestationObject));
}
exports.decodeAttestationObject = decodeAttestationObject;
// Make it possible to stub the return value during testing
exports._decodeAttestationObjectInternals = {
    stubThis: (value) => value,
};
