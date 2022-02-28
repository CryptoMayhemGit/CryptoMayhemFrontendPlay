import { MetamaskChainBase } from "./metamask-chain-base.model";
import { MetamaskCurrency } from "./metamask-currency.model";


export interface MetamaskChain extends MetamaskChainBase {

    chainName: string;
    nativeCurrency: MetamaskCurrency;
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[];

}
  