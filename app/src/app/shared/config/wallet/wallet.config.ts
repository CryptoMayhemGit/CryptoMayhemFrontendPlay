import { ContractsMetadata } from '../../models/contracts/contracts-metadata.model';

import CONTRACTS_METADATA_JSON from '../contracts-metadata.json';


export const CONNECTED = true;
export const DISCONNECTED = false;
export const EMPTY_CHAIN_ID = "";
export const EMPTY_ACCOUNT = "";
export const EMPTY_PROVIDER = undefined;

export const SUPPORTED_CHAIN_ID = "0x7a69";
export const DEFAULT_ASSET = "ADRIAT";
export const UNRECOGNIZED_CHAIN_ERROR_CODE = 4902;
export const PENDING_REQUEST_CODE = -32002;

export const CONTRACTS_METADATA: ContractsMetadata = CONTRACTS_METADATA_JSON;
