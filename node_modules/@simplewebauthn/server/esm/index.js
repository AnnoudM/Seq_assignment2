/**
 * @packageDocumentation
 * @module @simplewebauthn/server
 */
import { generateRegistrationOptions } from './registration/generateRegistrationOptions.js';
import { verifyRegistrationResponse } from './registration/verifyRegistrationResponse.js';
import { generateAuthenticationOptions } from './authentication/generateAuthenticationOptions.js';
import { verifyAuthenticationResponse } from './authentication/verifyAuthenticationResponse.js';
import { MetadataService } from './services/metadataService.js';
import { SettingsService } from './services/settingsService.js';
export { generateAuthenticationOptions, generateRegistrationOptions, MetadataService, SettingsService, verifyAuthenticationResponse, verifyRegistrationResponse, };
