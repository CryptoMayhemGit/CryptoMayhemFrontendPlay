import { MetamaskChain, MetamaskChainBase, MetamaskRequest } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/models";

export const BNB_CHAIN_ID: MetamaskChainBase = { chainId: "0x38" };
export const TEST_CHAIN_ID: MetamaskChainBase = { chainId: "0x7a69" };
export const LOCAL_CHAIN_ID: MetamaskChainBase = { chainId: "0x539" };

export const BNB_CHAIN: MetamaskChain = {
    ...BNB_CHAIN_ID,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18
    },
    rpcUrls: [
        "https://bsc-dataseed.binance.org/"
    ],
    blockExplorerUrls: [
        "https://bscscan.com"
    ],
    iconUrls: []
};

export const TEST_CHAIN: Partial<MetamaskChain> = {
    ...TEST_CHAIN_ID,
    chainName: "Crypto Mayhem Test Chain",
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
    }
};

export const LOCAL_CHAIN: Partial<MetamaskChain> = {
    ...LOCAL_CHAIN_ID,
    chainName: "Crypto Mayhem Local Chain",
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
    }
};

export const CHAIN_IDS = new Map([
    ["0x38", BNB_CHAIN_ID],
    ["0x7a69", TEST_CHAIN_ID],
    ["0x539", LOCAL_CHAIN_ID]
]);

export const CHAINS = new Map([
    ["0x38", BNB_CHAIN],
    ["0x7a69", TEST_CHAIN],
    ["0x539", LOCAL_CHAIN]
]);


export const ADD_ASSET_REQUEST: MetamaskRequest = { method: "wallet_watchAsset" };
export const ADD_CHAIN_REQUEST: MetamaskRequest = { method: "wallet_addEthereumChain" };
export const SWITCH_CHAIN_REQUEST: MetamaskRequest = { method: "wallet_switchEthereumChain" };

export const CONNECT_REQUEST: MetamaskRequest = { method: "eth_requestAccounts" };
export const CHAIN_ID_REQUEST: MetamaskRequest = { method: "eth_chainId" };
export const ACCOUNTS_REQUEST: MetamaskRequest = { method: "eth_accounts" };

export const CONNECT_LISTENER = "connect";
export const DISCONNECT_LISTENER = "disconnect";
export const CHAIN_LISTENER = "chainChanged";
export const ACCOUNTS_LISTENER = "accountsChanged";

export const USER_REJECTED_ERROR_CODE = 4001;
export const METAMASK_UNRECOGNIZED_CHAIN_ERROR_CODE = 4902;
export const METAMASK_PENDING_REQUEST_CODE = -32002;
