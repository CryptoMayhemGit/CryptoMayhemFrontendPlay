import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Web3Provider } from '@ethersproject/providers';
import { ethers, providers } from 'ethers';
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from '@walletconnect/qrcode-modal';
import { Store } from "@ngrx/store";


interface MetamaskWallet {
    provider: Web3Provider | undefined;
    signer: any;
}

interface SignedWalletWithAmount {
    signedMessage: string;
    ustcTokenAmount: number;
    maxUsdcTokenAmount: number;
}

import * as WalletActions from '../state/wallet.actions';
import { Observable } from "rxjs";


export const SALE_TOKEN = `http://salestokenapiwebapp.azurewebsites.net/api/SaleToken/ticket`;

@Injectable({ providedIn: 'root' })
export class WalletService {

    private provider: Web3Provider | undefined = undefined;
    private connector: WalletConnect | undefined = undefined;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly store: Store
    ) {}

    private createMetamaskProviderHooks(provider: any): void {
        provider.provider.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length === 0) {
                this.disconnectWallet();
            } else {
                this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: undefined}));
            }
        });

        // Subscribe to chainId change
        provider.provider.on("chainChanged", (chainId: number) => {
            this.store.dispatch(WalletActions.chainChanged({chainId: chainId}))
        });

        // Subscribe to session disconnection
        provider.on("disconnect", () => {
            this.store.dispatch(WalletActions.disconnectWallet());
        });

        const signer = provider.getSigner();
    }

    private createWalletConnectProviderHooks(provider: any): void {
        // Subscribe to connection events
        provider.on("connect", (error: any, payload: any) => {
            if (error) {
                throw error;
            }
            const { accounts, chainId } = payload.params[0];

            //TODO: move config to env
            let sessionConfig = {
                chainId: 56,
                networkId: 42,
                rpcUrl: 'https://bsc-dataseed.binance.org/',
                accounts: accounts
            };

            if (chainId !== 56)
                this.connector?.updateSession(sessionConfig);
            else {
                this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: chainId}));
            }
        });

        provider.on("session_update", (error: any, payload: any) => {
            console.log('session update hook');
            if (error) {
                throw error;
            }

            const { accounts, chainId } = payload.params[0];
            this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: chainId}));
        });

        provider.on("disconnect", (error: any, payload: any) => {
            if (error) {
                throw error;
            }

            this.connector = undefined;
            this.store.dispatch(WalletActions.disconnectWallet());
        });
    }

    public async connectWallet(walletType: WalletType): Promise<void> {
        switch(walletType) {
            case WalletType.metamask: {
                if (typeof window.ethereum !== 'undefined') {

                    this.provider = new providers.Web3Provider(window.ethereum, 'any');
                    this.createMetamaskProviderHooks(this.provider);
                    this.store.dispatch(WalletActions.connectWallet())
                    await this.provider.send(
                        'eth_requestAccounts',
                        []
                    )
                    .then((account) => {
                        this.store.dispatch(WalletActions.connectWalletSuccess());
                        this.store.dispatch(WalletActions.accountsChanged({account: account, chainId: undefined}));
                    })
                    .catch((error: any) => {
                        console.log('User reject login');
                        this.store.dispatch(WalletActions.connectWalletError());
                    });

                    const chainId = this.getAccountChain(WalletType.metamask);
                    this.store.dispatch(WalletActions.chainChanged({chainId}));

                    try {
                        await this.provider.provider.request?.({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x61'}]
                        });
                    } catch (error: any) {
                        if (error.code === 4902) {
                            try {
                                await this.provider.provider.request?.({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        {
                                            chainId: '0x61',
                                            rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
                                        },
                                    ],
                                });
                            } catch (addError) {
                                console.error('not this chain');
                                return
                            }
                        } else if (error.code === 4001) {
                            //TODO: Popup when user reject chain change
                            console.log('User reject chain change');
                            console.error(error)
                            return
                        }
                    }
                } else {
                    console.log('You dont have a wallet');
                    //TODO: Popup when user don't have a wallet
                }
                break;
            }
            case WalletType.walletConnect: {
                this.connector = new WalletConnect({
                    bridge: "https://bridge.walletconnect.org",
                    qrcodeModal: QRCodeModal,
                });
                if (!this.connector.connected) {
                    await this.connector.createSession({chainId: 56});
                    this.createWalletConnectProviderHooks(this.connector);
                } else {
                    //TODO: what when not connected?
                }
            }
        }
    }

    public disconnectWallet(): void {
        this.provider?.removeAllListeners();
        this.provider = undefined;
        this.store.dispatch(WalletActions.disconnectWallet());
    }

    private async getAccountBalance(walletAddress: string): Promise<void> {
        await this.provider?.getBalance(walletAddress)
        .then((balance) => console.log(balance))
        .catch(() => console.log('errorbalance'));
    }

    private getAccountChain(walletType: string): number | undefined {
        return this.provider?._network?.chainId;
    }

    public postBuyPreSaleTokens(usdcTokenAmount: number, wallet1: string): Observable<SignedWalletWithAmount> {
        const wallet = '0x5E4E7f4D98eC366FbAFAaFAa533939b0b0e3f8Aa';
        return this.httpClient.post<SignedWalletWithAmount>(SALE_TOKEN, {wallet, usdcTokenAmount});
    }

    public signWalletTransaction(signedWalletWithAmount: SignedWalletWithAmount){
        console.log(signedWalletWithAmount);
        //TODO: sign wallet transaction

        const ContractAbi = [
            {
                inputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "burner",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Burn",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "INITIAL_SUPPLY",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "burn",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "close",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimalFactor",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_subtractedValue",
                        "type": "uint256"
                    }
                ],
                "name": "decreaseApproval",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_addedValue",
                        "type": "uint256"
                    }
                ],
                "name": "increaseApproval",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "mint",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "start",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "stop",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "stopped",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_value",
                        "type": "uint256"
                    }
                ],
                name: "transferFrom",
                outputs: [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
            },
            {
                constant: false,
                inputs: [
                    {
                        internalType: "address",
                        name: "newOwner",
                        type: "address"
                    }
                ],
                name: "transferOwnership",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function"
            }
        ];

        try {
            const USDCContract = new ethers.Contract("0x05aaC9e42a6a5df698B9F57315BFB129F791d746", ContractAbi, this.provider?.getSigner());
            USDCContract['INITIAL_SUPPLY']().then((lol: any) => console.log(lol)).catch((err: any) => console.log(err));

        } catch (err: any) {
            console.log(err);
        }
    }
}