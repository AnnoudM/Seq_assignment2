/**
 * Generate a suitably random value to be used as an attestation or assertion challenge
 */
export declare function generateChallenge(): Promise<Uint8Array>;
export declare const _generateChallengeInternals: {
    stubThis: (value: Uint8Array) => Uint8Array;
};
