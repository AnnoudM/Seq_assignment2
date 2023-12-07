import type { COSEAlgorithmIdentifier, CredentialDeviceType, RegistrationResponseJSON } from '../deps.js';
import { AttestationFormat, AttestationStatement } from '../helpers/decodeAttestationObject.js';
import { AuthenticationExtensionsAuthenticatorOutputs } from '../helpers/decodeAuthenticatorExtensions.js';
export type VerifyRegistrationResponseOpts = {
    response: RegistrationResponseJSON;
    expectedChallenge: string | ((challenge: string) => boolean | Promise<boolean>);
    expectedOrigin: string | string[];
    expectedRPID?: string | string[];
    expectedType?: string | string[];
    requireUserVerification?: boolean;
    supportedAlgorithmIDs?: COSEAlgorithmIdentifier[];
};
/**
 * Verify that the user has legitimately completed the registration process
 *
 * **Options:**
 *
 * @param response Response returned by **@simplewebauthn/browser**'s `startAuthentication()`
 * @param expectedChallenge The base64url-encoded `options.challenge` returned by
 * `generateRegistrationOptions()`
 * @param expectedOrigin Website URL (or array of URLs) that the registration should have occurred on
 * @param expectedRPID RP ID (or array of IDs) that was specified in the registration options
 * @param expectedType (Optional) The response type expected ('webauthn.create')
 * @param requireUserVerification (Optional) Enforce user verification by the authenticator
 * (via PIN, fingerprint, etc...)
 * @param supportedAlgorithmIDs Array of numeric COSE algorithm identifiers supported for
 * attestation by this RP. See https://www.iana.org/assignments/cose/cose.xhtml#algorithms
 */
export declare function verifyRegistrationResponse(options: VerifyRegistrationResponseOpts): Promise<VerifiedRegistrationResponse>;
/**
 * Result of registration verification
 *
 * @param verified If the assertion response could be verified
 * @param registrationInfo.fmt Type of attestation
 * @param registrationInfo.counter The number of times the authenticator reported it has been used.
 * **Should be kept in a DB for later reference to help prevent replay attacks!**
 * @param registrationInfo.aaguid Authenticator's Attestation GUID indicating the type of the
 * authenticator
 * @param registrationInfo.credentialPublicKey The credential's public key
 * @param registrationInfo.credentialID The credential's credential ID for the public key above
 * @param registrationInfo.credentialType The type of the credential returned by the browser
 * @param registrationInfo.userVerified Whether the user was uniquely identified during attestation
 * @param registrationInfo.attestationObject The raw `response.attestationObject` Buffer returned by
 * the authenticator
 * @param registrationInfo.credentialDeviceType Whether this is a single-device or multi-device
 * credential. **Should be kept in a DB for later reference!**
 * @param registrationInfo.credentialBackedUp Whether or not the multi-device credential has been
 * backed up. Always `false` for single-device credentials. **Should be kept in a DB for later
 * reference!**
 * @param registrationInfo.origin The origin of the website that the registration occurred on
 * @param registrationInfo?.rpID The RP ID that the registration occurred on, if one or more were
 * specified in the registration options
 * @param registrationInfo?.authenticatorExtensionResults The authenticator extensions returned
 * by the browser
 */
export type VerifiedRegistrationResponse = {
    verified: boolean;
    registrationInfo?: {
        fmt: AttestationFormat;
        counter: number;
        aaguid: string;
        credentialID: Uint8Array;
        credentialPublicKey: Uint8Array;
        credentialType: 'public-key';
        attestationObject: Uint8Array;
        userVerified: boolean;
        credentialDeviceType: CredentialDeviceType;
        credentialBackedUp: boolean;
        origin: string;
        rpID?: string;
        authenticatorExtensionResults?: AuthenticationExtensionsAuthenticatorOutputs;
    };
};
/**
 * Values passed to all attestation format verifiers, from which they are free to use as they please
 */
export type AttestationFormatVerifierOpts = {
    aaguid: Uint8Array;
    attStmt: AttestationStatement;
    authData: Uint8Array;
    clientDataHash: Uint8Array;
    credentialID: Uint8Array;
    credentialPublicKey: Uint8Array;
    rootCertificates: string[];
    rpIdHash: Uint8Array;
    verifyTimestampMS?: boolean;
};
