import { Observable, of } from 'rxjs';
import { IWeb3Wallet } from './wallet.interface';
import QRCodeModal from '@walletconnect/qrcode-modal';
import WalletConnect from '@walletconnect/client';

export class WalletConnectWallet implements IWeb3Wallet {
  private static _instance: WalletConnectWallet;

  walletAddress: string | undefined;
  wallet: WalletConnect;

  constructor() {
    this.wallet = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    });
  }

  public static getInstance(): WalletConnectWallet {
    if (!WalletConnectWallet._instance) {
      this._instance = new WalletConnectWallet();
    }

    return WalletConnectWallet._instance;
  }

  connect(): void {
    /*let chainData = {
      chainId: 56,
      networkId: 42,
      rpcUrl: 'https://bsc-dataseed.binance.org/',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
      },
    };*/

    // if (!WalletConnectWallet._instance.wallet.connected) {
    //   WalletConnectWallet._instance.wallet.createSession({ chainId: 56 });
    //   return await this.getConnected();
    // }
  }

  getConnected(): Observable<any> {
    WalletConnectWallet._instance.wallet.on(
      'connect',
      (error: any, payload: any) => {
        if (error) {
          throw error;
        }

        // Get provided accounts and chainId
        console.log('pl', payload.params[0]);
        return of(payload.params[0]);
      }
    );

    return of(false);
  }

  disconnect(): Observable<boolean> {
    if (WalletConnectWallet._instance.wallet.connected) {
      WalletConnectWallet._instance.wallet.killSession();
    }

    WalletConnectWallet._instance.wallet.on('disconnect', (error: any) => {
      if (error) {
        throw error;
      }

      return of(true);
    });

    return of(false);
  }
}
