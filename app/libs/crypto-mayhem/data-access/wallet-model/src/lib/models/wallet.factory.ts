import { MetaMaskWallet } from "./metamask-wallet.class";
import { WalletType } from "./wallet.enum";
import { IWeb3Wallet } from "./wallet.interface";
import { WalletConnectWallet } from "./walletconnect-wallet.class";


export function getWalletInstance(walletType: WalletType): IWeb3Wallet | undefined {
    switch(walletType) {
        case WalletType.metamask: {
            return new MetaMaskWallet();
        }
        case WalletType.wallectConnect: {
            return new WalletConnectWallet();
        }
        default: {
            return;
        }
    }
}