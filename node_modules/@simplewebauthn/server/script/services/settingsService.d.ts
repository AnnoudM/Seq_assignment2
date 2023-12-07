import { AttestationFormat } from '../helpers/decodeAttestationObject.js';
type RootCertIdentifier = AttestationFormat | 'mds';
declare class BaseSettingsService {
    private pemCertificates;
    constructor();
    /**
     * Set potential root certificates for attestation formats that use them. Root certs will be tried
     * one-by-one when validating a certificate path.
     *
     * Certificates can be specified as a raw `Buffer`, or as a PEM-formatted string. If a
     * `Buffer` is passed in it will be converted to PEM format.
     */
    setRootCertificates(opts: {
        identifier: RootCertIdentifier;
        certificates: (Uint8Array | string)[];
    }): void;
    /**
     * Get any registered root certificates for the specified attestation format
     */
    getRootCertificates(opts: {
        identifier: RootCertIdentifier;
    }): string[];
}
export declare const SettingsService: BaseSettingsService;
export {};
