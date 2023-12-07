/**
 * Convert authenticator extension data buffer to a proper object
 *
 * @param extensionData Authenticator Extension Data buffer
 */
export declare function decodeAuthenticatorExtensions(extensionData: Uint8Array): AuthenticationExtensionsAuthenticatorOutputs | undefined;
export type AuthenticationExtensionsAuthenticatorOutputs = {
    devicePubKey?: DevicePublicKeyAuthenticatorOutput;
    uvm?: UVMAuthenticatorOutput;
};
export type DevicePublicKeyAuthenticatorOutput = {
    dpk?: Uint8Array;
    sig?: string;
    nonce?: Uint8Array;
    scope?: Uint8Array;
    aaguid?: Uint8Array;
};
export type UVMAuthenticatorOutput = {
    uvm?: Uint8Array[];
};
