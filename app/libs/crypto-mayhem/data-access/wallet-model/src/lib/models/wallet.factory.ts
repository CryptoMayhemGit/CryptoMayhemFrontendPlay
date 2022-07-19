import { MetaMaskWallet } from './metamask-wallet.class';
import { WalletType } from './wallet.enum';
import { IWeb3Wallet } from './wallet.interface';
import { WalletConnectWallet } from './walletconnect-wallet.class';

export function getWalletInstance(
  walletType: WalletType
): IWeb3Wallet | undefined {
  switch (walletType) {
    case WalletType.metamask: {
      return MetaMaskWallet.getInstance();
    }
    case WalletType.walletConnect: {
      return WalletConnectWallet.getInstance();
    }
    default: {
      return;
    }
  }
}
