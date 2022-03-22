import { MetamaskAsset } from "../../models/wallet/metamask/metamask-asset.model";
import { MetamaskChain } from "../../models/wallet/metamask/metamask-chain.model";
import { MetamaskChainBase } from "../../models/wallet/metamask/metamask-chain-base.model";
import { MetamaskRequest } from "../../models/wallet/metamask/metamask-request.model";


export const ADRIA_ASSET: MetamaskAsset = {
    type: "ERC20",
    options: {
        address: "0x0",
        symbol: "ADRIA",
        decimals: 18,
        image: ""
    }
};

export const BNB_CHAIN_ID: MetamaskChainBase = { chainId: "0x38" };
export const TEST_CHAIN_ID: MetamaskChainBase = { chainId: "0x7a69" };

export const BNB_CHAIN: MetamaskChain = {
    ...BNB_CHAIN_ID,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
        name: "BNB",
        symbol: "bnb",
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

export const TEST_CHAIN: MetamaskChain = {
    ...TEST_CHAIN_ID,
    chainName: "Crypto Mayhem Test Chain",
    nativeCurrency: {
        name: "BNB",
        symbol: "bnb",
        decimals: 18
    },
    rpcUrls: [
        "https://rpc.test.cryptomayhem.io/"
    ]
};

export const CHAIN_IDS = new Map([
    ["0x38", BNB_CHAIN_ID],
    ["0x7a69", TEST_CHAIN_ID]
]);

export const CHAINS = new Map([
    ["0x38", BNB_CHAIN],
    ["0x7a69", TEST_CHAIN]
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
export const UNRECOGNIZED_CHAIN_ERROR_CODE = 4902;
