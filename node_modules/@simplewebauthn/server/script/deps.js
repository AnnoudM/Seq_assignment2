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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDescription = exports.id_ce_keyDescription = exports.RSAPublicKey = exports.id_secp384r1 = exports.id_secp256r1 = exports.id_ecPublicKey = exports.ECParameters = exports.ECDSASigValue = exports.SubjectKeyIdentifier = exports.SubjectAlternativeName = exports.Name = exports.id_ce_subjectKeyIdentifier = exports.id_ce_subjectAltName = exports.id_ce_extKeyUsage = exports.id_ce_cRLDistributionPoints = exports.id_ce_basicConstraints = exports.id_ce_authorityKeyIdentifier = exports.ExtendedKeyUsage = exports.CRLDistributionPoints = exports.CertificateList = exports.Certificate = exports.BasicConstraints = exports.AuthorityKeyIdentifier = exports.AsnSerializer = exports.AsnParser = exports.crossFetch = exports.base64 = exports.cborx = void 0;
// cbor (a.k.a. cbor-x in Node land)
exports.cborx = __importStar(require("cbor-x/encode"));
// b64 (a.k.a. @hexagon/base64 in Node land)
var base64_1 = require("@hexagon/base64");
Object.defineProperty(exports, "base64", { enumerable: true, get: function () { return __importDefault(base64_1).default; } });
// cross-fetch
var cross_fetch_1 = require("cross-fetch");
Object.defineProperty(exports, "crossFetch", { enumerable: true, get: function () { return cross_fetch_1.fetch; } });
// @peculiar libraries
var asn1_schema_1 = require("@peculiar/asn1-schema");
Object.defineProperty(exports, "AsnParser", { enumerable: true, get: function () { return asn1_schema_1.AsnParser; } });
Object.defineProperty(exports, "AsnSerializer", { enumerable: true, get: function () { return asn1_schema_1.AsnSerializer; } });
var asn1_x509_1 = require("@peculiar/asn1-x509");
Object.defineProperty(exports, "AuthorityKeyIdentifier", { enumerable: true, get: function () { return asn1_x509_1.AuthorityKeyIdentifier; } });
Object.defineProperty(exports, "BasicConstraints", { enumerable: true, get: function () { return asn1_x509_1.BasicConstraints; } });
Object.defineProperty(exports, "Certificate", { enumerable: true, get: function () { return asn1_x509_1.Certificate; } });
Object.defineProperty(exports, "CertificateList", { enumerable: true, get: function () { return asn1_x509_1.CertificateList; } });
Object.defineProperty(exports, "CRLDistributionPoints", { enumerable: true, get: function () { return asn1_x509_1.CRLDistributionPoints; } });
Object.defineProperty(exports, "ExtendedKeyUsage", { enumerable: true, get: function () { return asn1_x509_1.ExtendedKeyUsage; } });
Object.defineProperty(exports, "id_ce_authorityKeyIdentifier", { enumerable: true, get: function () { return asn1_x509_1.id_ce_authorityKeyIdentifier; } });
Object.defineProperty(exports, "id_ce_basicConstraints", { enumerable: true, get: function () { return asn1_x509_1.id_ce_basicConstraints; } });
Object.defineProperty(exports, "id_ce_cRLDistributionPoints", { enumerable: true, get: function () { return asn1_x509_1.id_ce_cRLDistributionPoints; } });
Object.defineProperty(exports, "id_ce_extKeyUsage", { enumerable: true, get: function () { return asn1_x509_1.id_ce_extKeyUsage; } });
Object.defineProperty(exports, "id_ce_subjectAltName", { enumerable: true, get: function () { return asn1_x509_1.id_ce_subjectAltName; } });
Object.defineProperty(exports, "id_ce_subjectKeyIdentifier", { enumerable: true, get: function () { return asn1_x509_1.id_ce_subjectKeyIdentifier; } });
Object.defineProperty(exports, "Name", { enumerable: true, get: function () { return asn1_x509_1.Name; } });
Object.defineProperty(exports, "SubjectAlternativeName", { enumerable: true, get: function () { return asn1_x509_1.SubjectAlternativeName; } });
Object.defineProperty(exports, "SubjectKeyIdentifier", { enumerable: true, get: function () { return asn1_x509_1.SubjectKeyIdentifier; } });
var asn1_ecc_1 = require("@peculiar/asn1-ecc");
Object.defineProperty(exports, "ECDSASigValue", { enumerable: true, get: function () { return asn1_ecc_1.ECDSASigValue; } });
Object.defineProperty(exports, "ECParameters", { enumerable: true, get: function () { return asn1_ecc_1.ECParameters; } });
Object.defineProperty(exports, "id_ecPublicKey", { enumerable: true, get: function () { return asn1_ecc_1.id_ecPublicKey; } });
Object.defineProperty(exports, "id_secp256r1", { enumerable: true, get: function () { return asn1_ecc_1.id_secp256r1; } });
Object.defineProperty(exports, "id_secp384r1", { enumerable: true, get: function () { return asn1_ecc_1.id_secp384r1; } });
var asn1_rsa_1 = require("@peculiar/asn1-rsa");
Object.defineProperty(exports, "RSAPublicKey", { enumerable: true, get: function () { return asn1_rsa_1.RSAPublicKey; } });
var asn1_android_1 = require("@peculiar/asn1-android");
Object.defineProperty(exports, "id_ce_keyDescription", { enumerable: true, get: function () { return asn1_android_1.id_ce_keyDescription; } });
Object.defineProperty(exports, "KeyDescription", { enumerable: true, get: function () { return asn1_android_1.KeyDescription; } });
