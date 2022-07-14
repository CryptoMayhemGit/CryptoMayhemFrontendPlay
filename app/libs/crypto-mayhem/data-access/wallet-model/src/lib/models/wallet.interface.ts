import { Observable } from "rxjs";

export interface IWeb3Wallet {
    connect(): Observable<boolean>;
    disconnect(): Observable<boolean>;
}