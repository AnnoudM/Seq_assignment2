"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBase64url = exports.isBase64 = exports.toString = exports.fromString = exports.toBase64 = exports.fromBuffer = exports.toBuffer = void 0;
const deps_js_1 = require("../../deps.js");
/**
 * Decode from a Base64URL-encoded string to an ArrayBuffer. Best used when converting a
 * credential ID from a JSON string to an ArrayBuffer, like in allowCredentials or
 * excludeCredentials.
 *
 * @param buffer Value to decode from base64
 * @param to (optional) The decoding to use, in case it's desirable to decode from base64 instead
 */
function toBuffer(base64urlString, from = 'base64url') {
    const _buffer = deps_js_1.base64.toArrayBuffer(base64urlString, from === 'base64url');
    return new Uint8Array(_buffer);
}
exports.toBuffer = toBuffer;
/**
 * Encode the given array buffer into a Base64URL-encoded string. Ideal for converting various
 * credential response ArrayBuffers to string for sending back to the server as JSON.
 *
 * @param buffer Value to encode to base64
 * @param to (optional) The encoding to use, in case it's desirable to encode to base64 instead
 */
function fromBuffer(buffer, to = 'base64url') {
    return deps_js_1.base64.fromArrayBuffer(buffer, to === 'base64url');
}
exports.fromBuffer = fromBuffer;
/**
 * Convert a base64url string into base64
 */
function toBase64(base64urlString) {
    const fromBase64Url = deps_js_1.base64.toArrayBuffer(base64urlString, true);
    const toBase64 = deps_js_1.base64.fromArrayBuffer(fromBase64Url);
    return toBase64;
}
exports.toBase64 = toBase64;
/**
 * Encode a string to base64url
 */
function fromString(ascii) {
    return deps_js_1.base64.fromString(ascii, true);
}
exports.fromString = fromString;
/**
 * Decode a base64url string into its original string
 */
function toString(base64urlString) {
    return deps_js_1.base64.toString(base64urlString, true);
}
exports.toString = toString;
/**
 * Confirm that the string is encoded into base64
 */
function isBase64(input) {
    return deps_js_1.base64.validate(input, false);
}
exports.isBase64 = isBase64;
/**
 * Confirm that the string is encoded into base64url, with support for optional padding
 */
function isBase64url(input) {
    // Trim padding characters from the string if present
    input = input.replace(/=/g, '');
    return deps_js_1.base64.validate(input, true);
}
exports.isBase64url = isBase64url;
