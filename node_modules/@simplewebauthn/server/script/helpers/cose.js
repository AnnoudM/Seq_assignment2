"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCOSEAlg = exports.COSEALG = exports.isCOSECrv = exports.COSECRV = exports.isCOSEKty = exports.COSEKTY = exports.COSEKEYS = exports.isCOSEPublicKeyRSA = exports.isCOSEPublicKeyEC2 = exports.isCOSEPublicKeyOKP = void 0;
function isCOSEPublicKeyOKP(cosePublicKey) {
    const kty = cosePublicKey.get(COSEKEYS.kty);
    return isCOSEKty(kty) && kty === COSEKTY.OKP;
}
exports.isCOSEPublicKeyOKP = isCOSEPublicKeyOKP;
function isCOSEPublicKeyEC2(cosePublicKey) {
    const kty = cosePublicKey.get(COSEKEYS.kty);
    return isCOSEKty(kty) && kty === COSEKTY.EC2;
}
exports.isCOSEPublicKeyEC2 = isCOSEPublicKeyEC2;
function isCOSEPublicKeyRSA(cosePublicKey) {
    const kty = cosePublicKey.get(COSEKEYS.kty);
    return isCOSEKty(kty) && kty === COSEKTY.RSA;
}
exports.isCOSEPublicKeyRSA = isCOSEPublicKeyRSA;
/**
 * COSE Keys
 *
 * https://www.iana.org/assignments/cose/cose.xhtml#key-common-parameters
 * https://www.iana.org/assignments/cose/cose.xhtml#key-type-parameters
 */
var COSEKEYS;
(function (COSEKEYS) {
    COSEKEYS[COSEKEYS["kty"] = 1] = "kty";
    COSEKEYS[COSEKEYS["alg"] = 3] = "alg";
    COSEKEYS[COSEKEYS["crv"] = -1] = "crv";
    COSEKEYS[COSEKEYS["x"] = -2] = "x";
    COSEKEYS[COSEKEYS["y"] = -3] = "y";
    COSEKEYS[COSEKEYS["n"] = -1] = "n";
    COSEKEYS[COSEKEYS["e"] = -2] = "e";
})(COSEKEYS = exports.COSEKEYS || (exports.COSEKEYS = {}));
/**
 * COSE Key Types
 *
 * https://www.iana.org/assignments/cose/cose.xhtml#key-type
 */
var COSEKTY;
(function (COSEKTY) {
    COSEKTY[COSEKTY["OKP"] = 1] = "OKP";
    COSEKTY[COSEKTY["EC2"] = 2] = "EC2";
    COSEKTY[COSEKTY["RSA"] = 3] = "RSA";
})(COSEKTY = exports.COSEKTY || (exports.COSEKTY = {}));
function isCOSEKty(kty) {
    return Object.values(COSEKTY).indexOf(kty) >= 0;
}
exports.isCOSEKty = isCOSEKty;
/**
 * COSE Curves
 *
 * https://www.iana.org/assignments/cose/cose.xhtml#elliptic-curves
 */
var COSECRV;
(function (COSECRV) {
    COSECRV[COSECRV["P256"] = 1] = "P256";
    COSECRV[COSECRV["P384"] = 2] = "P384";
    COSECRV[COSECRV["P521"] = 3] = "P521";
    COSECRV[COSECRV["ED25519"] = 6] = "ED25519";
    COSECRV[COSECRV["SECP256K1"] = 8] = "SECP256K1";
})(COSECRV = exports.COSECRV || (exports.COSECRV = {}));
function isCOSECrv(crv) {
    return Object.values(COSECRV).indexOf(crv) >= 0;
}
exports.isCOSECrv = isCOSECrv;
/**
 * COSE Algorithms
 *
 * https://www.iana.org/assignments/cose/cose.xhtml#algorithms
 */
var COSEALG;
(function (COSEALG) {
    COSEALG[COSEALG["ES256"] = -7] = "ES256";
    COSEALG[COSEALG["EdDSA"] = -8] = "EdDSA";
    COSEALG[COSEALG["ES384"] = -35] = "ES384";
    COSEALG[COSEALG["ES512"] = -36] = "ES512";
    COSEALG[COSEALG["PS256"] = -37] = "PS256";
    COSEALG[COSEALG["PS384"] = -38] = "PS384";
    COSEALG[COSEALG["PS512"] = -39] = "PS512";
    COSEALG[COSEALG["ES256K"] = -47] = "ES256K";
    COSEALG[COSEALG["RS256"] = -257] = "RS256";
    COSEALG[COSEALG["RS384"] = -258] = "RS384";
    COSEALG[COSEALG["RS512"] = -259] = "RS512";
    COSEALG[COSEALG["RS1"] = -65535] = "RS1";
})(COSEALG = exports.COSEALG || (exports.COSEALG = {}));
function isCOSEAlg(alg) {
    return Object.values(COSEALG).indexOf(alg) >= 0;
}
exports.isCOSEAlg = isCOSEAlg;
