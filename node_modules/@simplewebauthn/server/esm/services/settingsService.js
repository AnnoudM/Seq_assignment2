import { convertCertBufferToPEM } from '../helpers/convertCertBufferToPEM.js';
import { GlobalSign_Root_CA } from './defaultRootCerts/android-safetynet.js';
import { Google_Hardware_Attestation_Root_1, Google_Hardware_Attestation_Root_2, } from './defaultRootCerts/android-key.js';
import { Apple_WebAuthn_Root_CA } from './defaultRootCerts/apple.js';
import { GlobalSign_Root_CA_R3 } from './defaultRootCerts/mds.js';
class BaseSettingsService {
    constructor() {
        // Certificates are stored as PEM-formatted strings
        Object.defineProperty(this, "pemCertificates", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pemCertificates = new Map();
    }
    /**
     * Set potential root certificates for attestation formats that use them. Root certs will be tried
     * one-by-one when validating a certificate path.
     *
     * Certificates can be specified as a raw `Buffer`, or as a PEM-formatted string. If a
     * `Buffer` is passed in it will be converted to PEM format.
     */
    setRootCertificates(opts) {
        const { identifier, certificates } = opts;
        const newCertificates = [];
        for (const cert of certificates) {
            if (cert instanceof Uint8Array) {
                newCertificates.push(convertCertBufferToPEM(cert));
            }
            else {
                newCertificates.push(cert);
            }
        }
        this.pemCertificates.set(identifier, newCertificates);
    }
    /**
     * Get any registered root certificates for the specified attestation format
     */
    getRootCertificates(opts) {
        const { identifier } = opts;
        return this.pemCertificates.get(identifier) ?? [];
    }
}
export const SettingsService = new BaseSettingsService();
// Initialize default certificates
SettingsService.setRootCertificates({
    identifier: 'android-key',
    certificates: [
        Google_Hardware_Attestation_Root_1,
        Google_Hardware_Attestation_Root_2,
    ],
});
SettingsService.setRootCertificates({
    identifier: 'android-safetynet',
    certificates: [GlobalSign_Root_CA],
});
SettingsService.setRootCertificates({
    identifier: 'apple',
    certificates: [Apple_WebAuthn_Root_CA],
});
SettingsService.setRootCertificates({
    identifier: 'mds',
    certificates: [GlobalSign_Root_CA_R3],
});
