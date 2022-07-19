import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { from, Observable, of } from "rxjs";
import { IWeb3Wallet } from "./wallet.interface";


export class MetaMaskWallet implements IWeb3Wallet {

    private static _instance: MetaMaskWallet;

    private _provider: any = undefined;
    private _signer: any;
    public walletAddress: string | undefined;

    private constructor() {}

    public static getInstance(): MetaMaskWallet {
        if (!MetaMaskWallet._instance) {
            this._instance = new MetaMaskWallet();
        }

        return MetaMaskWallet._instance;
    }

    public connect(): void {
        if (typeof window.ethereum !== 'undefined') {
            if (MetaMaskWallet._instance._provider === undefined) {

                MetaMaskWallet._instance._provider = new ethers.providers.Web3Provider(window.ethereum);
                const walletAccount = from(MetaMaskWallet._instance._provider.send("eth_requestAccounts", []))
                .subscribe((data) => {
                    console.log(data);
                    this._signer = this._provider.getSigner()
                },
                (err) => MetaMaskWallet._instance._provider = undefined)

                // if (walletAccount && walletAccount.length > 0) {
                //     this.setWalletAccount(walletAccount[0]);
                // }
            } else {
                //TODO: handle message/exception that we are already connected or do nothing?
            }

        }
        else {
            //TODO: handle message to user when they don't have metamask
        }
    }

    public disconnect(): Observable<boolean> {
        this._provider = undefined;
        this._signer = undefined;
        this.walletAddress = undefined;
        return of(true);
    }

    private setWalletAccount(walletAddress: string): void {
        MetaMaskWallet._instance.walletAddress = walletAddress;
    }
}