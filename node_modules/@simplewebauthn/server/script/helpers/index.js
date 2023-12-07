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
exports.verifySignature = exports.validateCertificatePath = exports.toHash = exports.parseAuthenticatorData = exports.isoUint8Array = exports.isoCrypto = exports.isoCBOR = exports.isoBase64URL = exports.isCertRevoked = exports.getCertificateInfo = exports.generateChallenge = exports.decodeCredentialPublicKey = exports.decodeClientDataJSON = exports.decodeAttestationObject = exports.cose = exports.convertCOSEtoPKCS = exports.convertCertBufferToPEM = exports.convertAAGUIDToString = void 0;
const convertAAGUIDToString_js_1 = require("./convertAAGUIDToString.js");
Object.defineProperty(exports, "convertAAGUIDToString", { enumerable: true, get: function () { return convertAAGUIDToString_js_1.convertAAGUIDToString; } });
const convertCertBufferToPEM_js_1 = require("./convertCertBufferToPEM.js");
Object.defineProperty(exports, "convertCertBufferToPEM", { enumerable: true, get: function () { return convertCertBufferToPEM_js_1.convertCertBufferToPEM; } });
const convertCOSEtoPKCS_js_1 = require("./convertCOSEtoPKCS.js");
Object.defineProperty(exports, "convertCOSEtoPKCS", { enumerable: true, get: function () { return convertCOSEtoPKCS_js_1.convertCOSEtoPKCS; } });
const decodeAttestationObject_js_1 = require("./decodeAttestationObject.js");
Object.defineProperty(exports, "decodeAttestationObject", { enumerable: true, get: function () { return decodeAttestationObject_js_1.decodeAttestationObject; } });
const decodeClientDataJSON_js_1 = require("./decodeClientDataJSON.js");
Object.defineProperty(exports, "decodeClientDataJSON", { enumerable: true, get: function () { return decodeClientDataJSON_js_1.decodeClientDataJSON; } });
const decodeCredentialPublicKey_js_1 = require("./decodeCredentialPublicKey.js");
Object.defineProperty(exports, "decodeCredentialPublicKey", { enumerable: true, get: function () { return decodeCredentialPublicKey_js_1.decodeCredentialPublicKey; } });
const generateChallenge_js_1 = require("./generateChallenge.js");
Object.defineProperty(exports, "generateChallenge", { enumerable: true, get: function () { return generateChallenge_js_1.generateChallenge; } });
const getCertificateInfo_js_1 = require("./getCertificateInfo.js");
Object.defineProperty(exports, "getCertificateInfo", { enumerable: true, get: function () { return getCertificateInfo_js_1.getCertificateInfo; } });
const isCertRevoked_js_1 = require("./isCertRevoked.js");
Object.defineProperty(exports, "isCertRevoked", { enumerable: true, get: function () { return isCertRevoked_js_1.isCertRevoked; } });
const parseAuthenticatorData_js_1 = require("./parseAuthenticatorData.js");
Object.defineProperty(exports, "parseAuthenticatorData", { enumerable: true, get: function () { return parseAuthenticatorData_js_1.parseAuthenticatorData; } });
const toHash_js_1 = require("./toHash.js");
Object.defineProperty(exports, "toHash", { enumerable: true, get: function () { return toHash_js_1.toHash; } });
const validateCertificatePath_js_1 = require("./validateCertificatePath.js");
Object.defineProperty(exports, "validateCertificatePath", { enumerable: true, get: function () { return validateCertificatePath_js_1.validateCertificatePath; } });
const verifySignature_js_1 = require("./verifySignature.js");
Object.defineProperty(exports, "verifySignature", { enumerable: true, get: function () { return verifySignature_js_1.verifySignature; } });
const index_js_1 = require("./iso/index.js");
Object.defineProperty(exports, "isoBase64URL", { enumerable: true, get: function () { return index_js_1.isoBase64URL; } });
Object.defineProperty(exports, "isoCBOR", { enumerable: true, get: function () { return index_js_1.isoCBOR; } });
Object.defineProperty(exports, "isoCrypto", { enumerable: true, get: function () { return index_js_1.isoCrypto; } });
Object.defineProperty(exports, "isoUint8Array", { enumerable: true, get: function () { return index_js_1.isoUint8Array; } });
const cose = __importStar(require("./cose.js"));
exports.cose = cose;
