/**
 * Decode and return the first item in a sequence of CBOR-encoded values
 *
 * @param input The CBOR data to decode
 * @param asObject (optional) Whether to convert any CBOR Maps into JavaScript Objects. Defaults to
 * `false`
 */
export declare function decodeFirst<Type>(input: Uint8Array): Type;
/**
 * Encode data to CBOR
 */
export declare function encode(input: unknown): Uint8Array;
