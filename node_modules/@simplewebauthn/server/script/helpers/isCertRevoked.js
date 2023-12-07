"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCertRevoked = void 0;
const deps_js_1 = require("../deps.js");
const index_js_1 = require("./iso/index.js");
const fetch_js_1 = require("./fetch.js");
const cacheRevokedCerts = {};
/**
 * A method to pull a CRL from a certificate and compare its serial number to the list of revoked
 * certificate serial numbers within the CRL.
 *
 * CRL certificate structure referenced from https://tools.ietf.org/html/rfc5280#page-117
 */
async function isCertRevoked(cert) {
    const { extensions } = cert.tbsCertificate;
    if (!extensions) {
        return false;
    }
    let extAuthorityKeyID;
    let extSubjectKeyID;
    let extCRLDistributionPoints;
    extensions.forEach((ext) => {
        if (ext.extnID === deps_js_1.id_ce_authorityKeyIdentifier) {
            extAuthorityKeyID = deps_js_1.AsnParser.parse(ext.extnValue, deps_js_1.AuthorityKeyIdentifier);
        }
        else if (ext.extnID === deps_js_1.id_ce_subjectKeyIdentifier) {
            extSubjectKeyID = deps_js_1.AsnParser.parse(ext.extnValue, deps_js_1.SubjectKeyIdentifier);
        }
        else if (ext.extnID === deps_js_1.id_ce_cRLDistributionPoints) {
            extCRLDistributionPoints = deps_js_1.AsnParser.parse(ext.extnValue, deps_js_1.CRLDistributionPoints);
        }
    });
    // Check to see if we've got cached info for the cert's CA
    let keyIdentifier = undefined;
    if (extAuthorityKeyID && extAuthorityKeyID.keyIdentifier) {
        keyIdentifier = index_js_1.isoUint8Array.toHex(new Uint8Array(extAuthorityKeyID.keyIdentifier.buffer));
    }
    else if (extSubjectKeyID) {
        /**
         * We might be dealing with a self-signed root certificate. Check the
         * Subject key Identifier extension next.
         */
        keyIdentifier = index_js_1.isoUint8Array.toHex(new Uint8Array(extSubjectKeyID.buffer));
    }
    const certSerialHex = index_js_1.isoUint8Array.toHex(new Uint8Array(cert.tbsCertificate.serialNumber));
    if (keyIdentifier) {
        const cached = cacheRevokedCerts[keyIdentifier];
        if (cached) {
            const now = new Date();
            // If there's a nextUpdate then make sure we're before it
            if (!cached.nextUpdate || cached.nextUpdate > now) {
                return cached.revokedCerts.indexOf(certSerialHex) >= 0;
            }
        }
    }
    const crlURL = extCRLDistributionPoints?.[0].distributionPoint?.fullName?.[0]
        .uniformResourceIdentifier;
    // If no URL is provided then we have nothing to check
    if (!crlURL) {
        return false;
    }
    // Download and read the CRL
    let certListBytes;
    try {
        const respCRL = await (0, fetch_js_1.fetch)(crlURL);
        certListBytes = await respCRL.arrayBuffer();
    }
    catch (_err) {
        return false;
    }
    let data;
    try {
        data = deps_js_1.AsnParser.parse(certListBytes, deps_js_1.CertificateList);
    }
    catch (_err) {
        // Something was malformed with the CRL, so pass
        return false;
    }
    const newCached = {
        revokedCerts: [],
        nextUpdate: undefined,
    };
    // nextUpdate
    if (data.tbsCertList.nextUpdate) {
        newCached.nextUpdate = data.tbsCertList.nextUpdate.getTime();
    }
    // revokedCertificates
    const revokedCerts = data.tbsCertList.revokedCertificates;
    if (revokedCerts) {
        for (const cert of revokedCerts) {
            const revokedHex = index_js_1.isoUint8Array.toHex(new Uint8Array(cert.userCertificate));
            newCached.revokedCerts.push(revokedHex);
        }
        // Cache the results
        if (keyIdentifier) {
            cacheRevokedCerts[keyIdentifier] = newCached;
        }
        return newCached.revokedCerts.indexOf(certSerialHex) >= 0;
    }
    return false;
}
exports.isCertRevoked = isCertRevoked;
