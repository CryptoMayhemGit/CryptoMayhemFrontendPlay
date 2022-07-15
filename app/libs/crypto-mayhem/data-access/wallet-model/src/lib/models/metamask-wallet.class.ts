import detectEthereumProvider from "@metamask/detect-provider";
import { Observable, of } from "rxjs";
import { IWeb3Wallet } from "./wallet.interface";


export class MetaMaskWallet implements IWeb3Wallet {

    public provider: any;
    walletAddress: string | undefined;

    constructor() {}

    async connect(): Promise<void> {
        this.provider = await detectEthereumProvider({
            mustBeMetaMask: true
        });
        if(this.provider) {
            const walletAccount = await this.provider.send("eth_requestAccounts", []);
            if (walletAccount && walletAccount.result[0] > 0) {
                this.setWalletAccount(walletAccount.result[0]);
            }
        }
    }

    disconnect(): Observable<boolean> {
        throw new Error("Method not implemented.");
    }

    private setWalletAccount(walletAddress: string) {
        this.walletAddress = walletAddress;
    }
}