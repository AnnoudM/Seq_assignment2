"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJWT = void 0;
const index_js_1 = require("../helpers/iso/index.js");
/**
 * Process a JWT into Javascript-friendly data structures
 */
function parseJWT(jwt) {
    const parts = jwt.split('.');
    return [
        JSON.parse(index_js_1.isoBase64URL.toString(parts[0])),
        JSON.parse(index_js_1.isoBase64URL.toString(parts[1])),
        parts[2],
    ];
}
exports.parseJWT = parseJWT;
