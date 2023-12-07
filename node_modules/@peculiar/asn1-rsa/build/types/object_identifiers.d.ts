/**
 * ```
 * pkcs-1    OBJECT IDENTIFIER ::= {
       iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) 1
 * ```
 */
export declare const id_pkcs_1 = "1.2.840.113549.1.1";
/**
 * ```
 * rsaEncryption    OBJECT IDENTIFIER ::= { pkcs-1 1 }
 * ```
 */
export declare const id_rsaEncryption = "1.2.840.113549.1.1.1";
/**
 * ```
 * id-RSAES-OAEP    OBJECT IDENTIFIER ::= { pkcs-1 7 }
 * ```
 */
export declare const id_RSAES_OAEP = "1.2.840.113549.1.1.7";
/**
 * ```
 * id-pSpecified    OBJECT IDENTIFIER ::= { pkcs-1 9 }
 * ```
 */
export declare const id_pSpecified = "1.2.840.113549.1.1.9";
/**
 * ```
 * id-RSASSA-PSS    OBJECT IDENTIFIER ::= { pkcs-1 10 }
 * ```
 */
export declare const id_RSASSA_PSS = "1.2.840.113549.1.1.10";
/**
 * ```
 * md2WithRSAEncryption         OBJECT IDENTIFIER ::= { pkcs-1 2 }
 * ```
 */
export declare const id_md2WithRSAEncryption = "1.2.840.113549.1.1.2";
/**
 * ```
 * md5WithRSAEncryption         OBJECT IDENTIFIER ::= { pkcs-1 4 }
 * ```
 */
export declare const id_md5WithRSAEncryption = "1.2.840.113549.1.1.4";
/**
 * ```
 * sha1WithRSAEncryption        OBJECT IDENTIFIER ::= { pkcs-1 5 }
 * ```
 */
export declare const id_sha1WithRSAEncryption = "1.2.840.113549.1.1.5";
/**
 * ```
 * sha224WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 14 }
 * ```
 */
export declare const id_sha224WithRSAEncryption = "1.2.840.113549.1.1.14";
/**
 * ```
 * sha224WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 14 }
 * ```
 * @deprecated Should be removed later
 */
export declare const id_ssha224WithRSAEncryption = "1.2.840.113549.1.1.14";
/**
 * ```
 * sha256WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 11 }
 * ```
 */
export declare const id_sha256WithRSAEncryption = "1.2.840.113549.1.1.11";
/**
 * ```
 * sha384WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 12 }
 * ```
 */
export declare const id_sha384WithRSAEncryption = "1.2.840.113549.1.1.12";
/**
 * ```
 * sha512WithRSAEncryption      OBJECT IDENTIFIER ::= { pkcs-1 13 }
 * ```
 */
export declare const id_sha512WithRSAEncryption = "1.2.840.113549.1.1.13";
/**
 * ```
 * sha512-224WithRSAEncryption  OBJECT IDENTIFIER ::= { pkcs-1 15 }
 * ```
 */
export declare const id_sha512_224WithRSAEncryption = "1.2.840.113549.1.1.15";
/**
 * ```
 * sha512-256WithRSAEncryption  OBJECT IDENTIFIER ::= { pkcs-1 16 }
 * ```
 */
export declare const id_sha512_256WithRSAEncryption = "1.2.840.113549.1.1.16";
/**
 * ```
 * id-sha1    OBJECT IDENTIFIER ::= {
 *   iso(1) identified-organization(3) oiw(14) secsig(3) algorithms(2)
 *   26
 * ```
 */
export declare const id_sha1 = "1.3.14.3.2.26";
/**
 * ```
 * id-sha224    OBJECT IDENTIFIER ::= {
 *   joint-iso-itu-t (2) country (16) us (840) organization (1)
 *   gov (101) csor (3) nistalgorithm (4) hashalgs (2) 4
 * }
 * ```
 */
export declare const id_sha224 = "2.16.840.1.101.3.4.2.4";
/**
 * ```
 * id-sha256    OBJECT IDENTIFIER ::= {
 *   joint-iso-itu-t (2) country (16) us (840) organization (1)
 *   gov (101) csor (3) nistalgorithm (4) hashalgs (2) 1
 * }
 * ```
 */
export declare const id_sha256 = "2.16.840.1.101.3.4.2.1";
/**
 * ```
 * id-sha384    OBJECT IDENTIFIER ::= {
 *   joint-iso-itu-t (2) country (16) us (840) organization (1)
 *   gov (101) csor (3) nistalgorithm (4) hashalgs (2) 2
 * }
 * ```
 */
export declare const id_sha384 = "2.16.840.1.101.3.4.2.2";
/**
 * ```
 * id-sha512    OBJECT IDENTIFIER ::= {
 *   joint-iso-itu-t (2) country (16) us (840) organization (1)
 *   gov (101) csor (3) nistalgorithm (4) hashalgs (2) 3
 * }
 * ```
 */
export declare const id_sha512 = "2.16.840.1.101.3.4.2.3";
/**
 * ```
 * id-sha512-224    OBJECT IDENTIFIER ::= {
 *   joint-iso-itu-t (2) country (16) us (840) organization (1)
 *   gov (101) csor (3) nistalgorithm (4) hashalgs (2) 5
 * }
 * ```
 */
export declare const id_sha512_224 = "2.16.840.1.101.3.4.2.5";
/**
 * ```
 * id-sha512-256    OBJECT IDENTIFIER ::= {
 *   joint-iso-itu-t (2) country (16) us (840) organization (1)
 *   gov (101) csor (3) nistalgorithm (4) hashalgs (2) 6
 * }
 * ```
 */
export declare const id_sha512_256 = "2.16.840.1.101.3.4.2.6";
/**
 * ```
 * id-md2 OBJECT IDENTIFIER ::= {
 *     iso(1) member-body(2) us(840) rsadsi(113549) digestAlgorithm(2) 2
 * }
 * ```
 */
export declare const id_md2 = "1.2.840.113549.2.2";
/**
 * ```
 * id-md5 OBJECT IDENTIFIER ::= {
 *     iso(1) member-body(2) us(840) rsadsi(113549) digestAlgorithm(2) 5
 * }
 * ```
 */
export declare const id_md5 = "1.2.840.113549.2.5";
/**
 * ```
 * id-mgf1    OBJECT IDENTIFIER ::= { pkcs-1 8 }
 * ```
 */
export declare const id_mgf1 = "1.2.840.113549.1.1.8";
