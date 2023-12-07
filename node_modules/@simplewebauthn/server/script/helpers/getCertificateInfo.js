"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertificateInfo = void 0;
const deps_js_1 = require("../deps.js");
const issuerSubjectIDKey = {
    '2.5.4.6': 'C',
    '2.5.4.10': 'O',
    '2.5.4.11': 'OU',
    '2.5.4.3': 'CN',
};
/**
 * Extract PEM certificate info
 *
 * @param pemCertificate Result from call to `convertASN1toPEM(x5c[0])`
 */
function getCertificateInfo(leafCertBuffer) {
    const x509 = deps_js_1.AsnParser.parse(leafCertBuffer, deps_js_1.Certificate);
    const parsedCert = x509.tbsCertificate;
    // Issuer
    const issuer = { combined: '' };
    parsedCert.issuer.forEach(([iss]) => {
        const key = issuerSubjectIDKey[iss.type];
        if (key) {
            issuer[key] = iss.value.toString();
        }
    });
    issuer.combined = issuerSubjectToString(issuer);
    // Subject
    const subject = { combined: '' };
    parsedCert.subject.forEach(([iss]) => {
        const key = issuerSubjectIDKey[iss.type];
        if (key) {
            subject[key] = iss.value.toString();
        }
    });
    subject.combined = issuerSubjectToString(subject);
    let basicConstraintsCA = false;
    if (parsedCert.extensions) {
        // console.log(parsedCert.extensions);
        for (const ext of parsedCert.extensions) {
            if (ext.extnID === deps_js_1.id_ce_basicConstraints) {
                const basicConstraints = deps_js_1.AsnParser.parse(ext.extnValue, deps_js_1.BasicConstraints);
                basicConstraintsCA = basicConstraints.cA;
            }
        }
    }
    return {
        issuer,
        subject,
        version: parsedCert.version,
        basicConstraintsCA,
        notBefore: parsedCert.validity.notBefore.getTime(),
        notAfter: parsedCert.validity.notAfter.getTime(),
        parsedCertificate: x509,
    };
}
exports.getCertificateInfo = getCertificateInfo;
/**
 * Stringify the parts of Issuer or Subject info for easier comparison of subject issuers with
 * issuer subjects.
 *
 * The order might seem arbitrary, because it is. It should be enough that the two are stringified
 * in the same order.
 */
function issuerSubjectToString(input) {
    const parts = [];
    if (input.C) {
        parts.push(input.C);
    }
    if (input.O) {
        parts.push(input.O);
    }
    if (input.OU) {
        parts.push(input.OU);
    }
    if (input.CN) {
        parts.push(input.CN);
    }
    return parts.join(' : ');
}
