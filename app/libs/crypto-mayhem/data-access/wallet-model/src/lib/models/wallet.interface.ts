import { Observable } from 'rxjs';

export interface IWeb3Wallet {
  walletAddress: string | undefined;

  connect(): Observable<any>;
  disconnect(): Observable<boolean>;
}
