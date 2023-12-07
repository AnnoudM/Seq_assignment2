"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCertificatePath = void 0;
const deps_js_1 = require("../deps.js");
const isCertRevoked_js_1 = require("./isCertRevoked.js");
const verifySignature_js_1 = require("./verifySignature.js");
const mapX509SignatureAlgToCOSEAlg_js_1 = require("./mapX509SignatureAlgToCOSEAlg.js");
const getCertificateInfo_js_1 = require("./getCertificateInfo.js");
const convertPEMToBytes_js_1 = require("./convertPEMToBytes.js");
/**
 * Traverse an array of PEM certificates and ensure they form a proper chain
 * @param certificates Typically the result of `x5c.map(convertASN1toPEM)`
 * @param rootCertificates Possible root certificates to complete the path
 */
async function validateCertificatePath(certificates, rootCertificates = []) {
    if (rootCertificates.length === 0) {
        // We have no root certs with which to create a full path, so skip path validation
        // TODO: Is this going to be acceptable default behavior??
        return true;
    }
    let invalidSubjectAndIssuerError = false;
    let certificateNotYetValidOrExpiredErrorMessage = undefined;
    for (const rootCert of rootCertificates) {
        try {
            const certsWithRoot = certificates.concat([rootCert]);
            await _validatePath(certsWithRoot);
            // If we successfully validated a path then there's no need to continue. Reset any existing
            // errors that were thrown by earlier root certificates
            invalidSubjectAndIssuerError = false;
            certificateNotYetValidOrExpiredErrorMessage = undefined;
            break;
        }
        catch (err) {
            if (err instanceof InvalidSubjectAndIssuer) {
                invalidSubjectAndIssuerError = true;
            }
            else if (err instanceof CertificateNotYetValidOrExpired) {
                certificateNotYetValidOrExpiredErrorMessage = err.message;
            }
            else {
                throw err;
            }
        }
    }
    // We tried multiple root certs and none of them worked
    if (invalidSubjectAndIssuerError) {
        throw new InvalidSubjectAndIssuer();
    }
    else if (certificateNotYetValidOrExpiredErrorMessage) {
        throw new CertificateNotYetValidOrExpired(certificateNotYetValidOrExpiredErrorMessage);
    }
    return true;
}
exports.validateCertificatePath = validateCertificatePath;
async function _validatePath(certificates) {
    if (new Set(certificates).size !== certificates.length) {
        throw new Error('Invalid certificate path: found duplicate certificates');
    }
    // From leaf to root, make sure each cert is issued by the next certificate in the chain
    for (let i = 0; i < certificates.length; i += 1) {
        const subjectPem = certificates[i];
        const isLeafCert = i === 0;
        const isRootCert = i + 1 >= certificates.length;
        let issuerPem = '';
        if (isRootCert) {
            issuerPem = subjectPem;
        }
        else {
            issuerPem = certificates[i + 1];
        }
        const subjectInfo = (0, getCertificateInfo_js_1.getCertificateInfo)((0, convertPEMToBytes_js_1.convertPEMToBytes)(subjectPem));
        const issuerInfo = (0, getCertificateInfo_js_1.getCertificateInfo)((0, convertPEMToBytes_js_1.convertPEMToBytes)(issuerPem));
        const x509Subject = subjectInfo.parsedCertificate;
        // Check for certificate revocation
        const subjectCertRevoked = await (0, isCertRevoked_js_1.isCertRevoked)(x509Subject);
        if (subjectCertRevoked) {
            throw new Error(`Found revoked certificate in certificate path`);
        }
        // Check that intermediate certificate is within its valid time window
        const { notBefore, notAfter } = issuerInfo;
        const now = new Date(Date.now());
        if (notBefore > now || notAfter < now) {
            if (isLeafCert) {
                throw new CertificateNotYetValidOrExpired(`Leaf certificate is not yet valid or expired: ${issuerPem}`);
            }
            else if (isRootCert) {
                throw new CertificateNotYetValidOrExpired(`Root certificate is not yet valid or expired: ${issuerPem}`);
            }
            else {
                throw new CertificateNotYetValidOrExpired(`Intermediate certificate is not yet valid or expired: ${issuerPem}`);
            }
        }
        if (subjectInfo.issuer.combined !== issuerInfo.subject.combined) {
            throw new InvalidSubjectAndIssuer();
        }
        // Verify the subject certificate's signature with the issuer cert's public key
        const data = deps_js_1.AsnSerializer.serialize(x509Subject.tbsCertificate);
        const signature = x509Subject.signatureValue;
        const signatureAlgorithm = (0, mapX509SignatureAlgToCOSEAlg_js_1.mapX509SignatureAlgToCOSEAlg)(x509Subject.signatureAlgorithm.algorithm);
        const issuerCertBytes = (0, convertPEMToBytes_js_1.convertPEMToBytes)(issuerPem);
        const verified = await (0, verifySignature_js_1.verifySignature)({
            data: new Uint8Array(data),
            signature: new Uint8Array(signature),
            x509Certificate: issuerCertBytes,
            hashAlgorithm: signatureAlgorithm,
        });
        if (!verified) {
            throw new Error('Invalid certificate path: invalid signature');
        }
    }
    return true;
}
// Custom errors to help pass on certain errors
class InvalidSubjectAndIssuer extends Error {
    constructor() {
        const message = 'Subject issuer did not match issuer subject';
        super(message);
        this.name = 'InvalidSubjectAndIssuer';
    }
}
class CertificateNotYetValidOrExpired extends Error {
    constructor(message) {
        super(message);
        this.name = 'CertificateNotYetValidOrExpired';
    }
}
