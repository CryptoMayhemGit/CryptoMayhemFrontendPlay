export interface MetamaskAssetOptions {
    address: string;
    symbol: string; 
    decimals: number;
    image: string;
}

export interface MetamaskWindow {
    ethereum?: MetamaskProvider;
}

export interface MetamaskAsset {
    type: string;
    options: MetamaskAssetOptions;
}

export interface MetamaskRequest {
    method: string;
    params?: any;
}

export interface MetamaskProvider {
    request: (args: MetamaskRequest) => Promise<any>;
    on: (method: string, listener: (...args: any[]) => void) => void;
    removeListener: (method: string, listener: (...args: any[]) => void) => void;
}

export interface MetamaskError {
    code: number;
}

export interface MetamaskCurrency {
    name: string;
    symbol: string; 
    decimals: number;
}

export interface MetamaskChainBase {
    chainId: string;
}
  
export interface MetamaskChain extends MetamaskChainBase {
    chainName: string;
    nativeCurrency: MetamaskCurrency;
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[];
}
  

