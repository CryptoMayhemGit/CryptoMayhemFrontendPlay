import { Observable } from "rxjs";
import { IWeb3Wallet } from "./wallet.interface";

export class WalletConnectWallet implements IWeb3Wallet {

    constructor() {}

    connect(): Observable<boolean> {
        throw new Error("Method not implemented.");
    }
    disconnect(): Observable<boolean> {
        throw new Error("Method not implemented.");
    }
}