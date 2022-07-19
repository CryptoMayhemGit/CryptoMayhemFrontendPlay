import { Observable } from 'rxjs';

export interface IWeb3Wallet {
  walletAddress: string | undefined;

  connect(): void | Observable<any>;
  disconnect(): Observable<boolean>;
}
