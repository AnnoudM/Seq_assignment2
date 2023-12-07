import type { AttestationFormatVerifierOpts } from '../verifyRegistrationResponse.js';
/**
 * Verify an attestation response with fmt 'android-safetynet'
 */
export declare function verifyAttestationAndroidSafetyNet(options: AttestationFormatVerifierOpts): Promise<boolean>;
