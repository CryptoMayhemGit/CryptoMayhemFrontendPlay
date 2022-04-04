import { environment } from "src/environments/environment";


export const CONNECTED = true;
export const DISCONNECTED = false;
export const EMPTY_CHAIN_ID = "";
export const EMPTY_ACCOUNT = "";
export const EMPTY_PROVIDER = undefined;

export const UNRECOGNIZED_CHAIN_ERROR_CODE = 4902;
export const PENDING_REQUEST_CODE = -32002;

export const SUPPORTED_CHAIN_ID = environment.rpcChainId;
export const DEFAULT_ASSET = environment.defaultAsset;
