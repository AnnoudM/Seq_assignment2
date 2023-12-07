"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._fetchInternals = exports.fetch = void 0;
const deps_js_1 = require("../deps.js");
/**
 * A simple method for requesting data via standard `fetch`. Should work
 * across multiple runtimes.
 */
function fetch(url) {
    return exports._fetchInternals.stubThis(url);
}
exports.fetch = fetch;
// Make it possible to stub the return value during testing
exports._fetchInternals = {
    stubThis: (url) => (0, deps_js_1.crossFetch)(url),
};
