"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._getWebCryptoInternals = exports.MissingWebCrypto = exports.getWebCrypto = void 0;
let webCrypto = undefined;
/**
 * Try to get an instance of the Crypto API from the current runtime. Should support Node,
 * as well as others, like Deno, that implement Web APIs.
 */
async function getWebCrypto() {
    if (webCrypto) {
        return webCrypto;
    }
    /**
     * Naively attempt to access Crypto as a global object, which popular alternative run-times
     * support.
     */
    const _globalThisCrypto = exports._getWebCryptoInternals.stubThisGlobalThisCrypto();
    if (_globalThisCrypto) {
        webCrypto = _globalThisCrypto;
        return webCrypto;
    }
    /**
     * `globalThis.crypto` isn't available, so attempt a Node import...
     */
    const _nodeCrypto = await exports._getWebCryptoInternals.stubThisImportNodeCrypto();
    if (_nodeCrypto?.webcrypto) {
        webCrypto = _nodeCrypto.webcrypto;
        return webCrypto;
    }
    // We tried to access it both in Node and globally, so bail out
    throw new MissingWebCrypto();
}
exports.getWebCrypto = getWebCrypto;
class MissingWebCrypto extends Error {
    constructor() {
        const message = 'An instance of the Crypto API could not be located';
        super(message);
        this.name = 'MissingWebCrypto';
    }
}
exports.MissingWebCrypto = MissingWebCrypto;
// Make it possible to stub return values during testing
exports._getWebCryptoInternals = {
    stubThisImportNodeCrypto: async () => {
        try {
            // dnt-shim-ignore
            const _nodeCrypto = await Promise.resolve().then(() => __importStar(require('crypto')));
            return _nodeCrypto;
        }
        catch (_err) {
            /**
             * Intentionally declaring webcrypto as undefined because we're assuming the Node import
             * failed due to either:
             * - `import()` isn't supported
             * - `node:crypto` is unavailable.
             */
            return { webcrypto: undefined };
        }
    },
    stubThisGlobalThisCrypto: () => globalThis.crypto,
    // Make it possible to reset the `webCrypto` at the top of the file
    setCachedCrypto: (newCrypto) => {
        webCrypto = newCrypto;
    },
};
