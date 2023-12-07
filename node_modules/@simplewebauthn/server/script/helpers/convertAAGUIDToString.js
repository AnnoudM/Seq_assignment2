"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertAAGUIDToString = void 0;
const index_js_1 = require("./iso/index.js");
/**
 * Convert the aaguid buffer in authData into a UUID string
 */
function convertAAGUIDToString(aaguid) {
    // Raw Hex: adce000235bcc60a648b0b25f1f05503
    const hex = index_js_1.isoUint8Array.toHex(aaguid);
    const segments = [
        hex.slice(0, 8),
        hex.slice(8, 12),
        hex.slice(12, 16),
        hex.slice(16, 20),
        hex.slice(20, 32), // 8
    ];
    // Formatted: adce0002-35bc-c60a-648b-0b25f1f05503
    return segments.join('-');
}
exports.convertAAGUIDToString = convertAAGUIDToString;
