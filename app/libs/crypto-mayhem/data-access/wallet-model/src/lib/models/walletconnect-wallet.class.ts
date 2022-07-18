import { Observable } from "rxjs";
import { IWeb3Wallet } from "./wallet.interface";

export class WalletConnectWallet implements IWeb3Wallet {

    constructor() {

    }
    walletAddress: string | undefined;

    connect(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    disconnect(): Observable<boolean> {
        throw new Error("Method not implemented.");
    }
}