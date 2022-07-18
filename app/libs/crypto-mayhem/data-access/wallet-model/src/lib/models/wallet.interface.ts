import { Observable } from "rxjs";

export interface IWeb3Wallet {
    walletAddress: string | undefined;

    connect(): Promise<void>;
    disconnect(): Observable<boolean>;
}