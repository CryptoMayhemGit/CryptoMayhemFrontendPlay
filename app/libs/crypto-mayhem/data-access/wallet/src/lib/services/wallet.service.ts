import { Inject, Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, ethers, providers, utils } from 'ethers';
import detectEthereumProvider from "@metamask/detect-provider";
import { WalletType } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/wallet-model";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from '@walletconnect/qrcode-modal';
import { select, State, Store } from "@ngrx/store";

import * as WalletSelectors from '../state/wallet.selectors';

interface SignedWalletWithAmount {
    s: string;
    r: string;
    v: string;
    stage: number;
    ustcTokenAmount: number;
    maxUsdcTokenAmount: number;
}

import * as WalletActions from '../state/wallet.actions';
import { Observable, of } from "rxjs";
import { SALE_TOKEN } from "./wallet.endpoints";
import { AppConfig, APP_CONFIG } from "@crypto-mayhem-frontend/crypto-mayhem/config";
import { AdriaTokenContractFactory, AdriaVestingContract, AdriaVestingContractFactory, UsdcTokenContractFactory } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/contract-model";
import { NotificationDroneEventTypes, NotificationDroneService } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone";
import { WalletEffects } from "../state/wallet.effects";
import { WalletState } from "../state/wallet.reducer";
import { formatBytes32String, FormatTypes, parseBytes32String } from "ethers/lib/utils";

const ACCOUNTS_CHANGED = 'accountsChanged';
const CHAIN_CHANGED = 'chainChanged';
const DISCONNECT = 'disconnect';
const CONNECT = 'connect';
const UPDATE_SESSION = 'session_update';

@Injectable({ providedIn: 'root' })
export class WalletService {

    private provider: Web3Provider | undefined = undefined;
    private connector: WalletConnect | undefined = undefined;
    private walletType: WalletType = WalletType.none;

    constructor(
        private readonly httpClient: HttpClient,
        private store: Store,
        private readonly notificationDroneService: NotificationDroneService,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig
    ) {
        this.store.pipe(
            select(WalletSelectors.getWalletType)
            ).subscribe((walletType: WalletType) => this.walletType = walletType);
    }

    private loggingInDevelopMode(where: string, message: any): void {
        !this.appConfig.production && console.log(where, message);
    }

    //Metamask handlers
    handleAccountsChangedMetamask = (accounts: string[]): void => {
        if (!Array.isArray(accounts))
            this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: undefined}));

        if (accounts.length === 0) {
            this.disconnectWallet();
        } else {
            this.loggingInDevelopMode('handleAccountChanged', accounts);
            this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: undefined}));
        }
    }

    handleChainChangedMetamask = (chainIdHex: string): void => {
        if (typeof chainIdHex === 'undefined')
            return;

        this.store.dispatch(WalletActions.chainChanged({chainId: chainIdHex}));

        chainIdHex !== this.appConfig.chainIdHexBinance ?
        this.notificationDroneService.error(NotificationDroneEventTypes.BAD_NETWORK) :
        this.notificationDroneService.hide();
    }

    //WalletConnect handlers
    handleConnectWalletConnect = (error: any, payload: any): void => {
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
    }

    handleUpdateSessionWalletConnect = (error: any, payload: any) => {
        if (error) {
            throw error;
        }

        const { accounts, chainId } = payload.params[0];
        this.store.dispatch(WalletActions.accountsChanged({account: accounts[0], chainId: chainId}));
    }

    handleDisconnectWalletConnect = (error: any, payload: any): void => {
        if (error) {
            throw error;
        }

        this.connector = undefined;
        this.store.dispatch(WalletActions.disconnectWallet());
    }

    private createMetamaskProviderHooks(provider: any): void {
        provider.provider.on(ACCOUNTS_CHANGED, this.handleAccountsChangedMetamask);
        provider.provider.on(CHAIN_CHANGED, this.handleChainChangedMetamask);
    }

    private createWalletConnectProviderHooks(provider: any): void {
        provider.on(CONNECT, this.handleConnectWalletConnect);
        provider.on(UPDATE_SESSION, this.handleUpdateSessionWalletConnect);
        provider.on(DISCONNECT, this.handleDisconnectWalletConnect);
    }

    private removeMetamaskProviderHooks(provider: any): void {
        (this.provider?.provider as any).removeListener(ACCOUNTS_CHANGED, this.handleAccountsChangedMetamask);
        (this.provider?.provider as any).removeListener(CHAIN_CHANGED, this.handleChainChangedMetamask);
    }

    private setChainId() {
        if (this.provider?._network.chainId)
            this.store.dispatch(WalletActions.chainChanged({chainId: this.provider?._network.chainId.toString()}));
    }

    public async connectWallet(walletType: WalletType): Promise<void> {
        switch(walletType) {
            case WalletType.metamask: {
                if (typeof window.ethereum !== 'undefined') {
                    this.provider = new providers.Web3Provider(window.ethereum, 'any');
                    this.createMetamaskProviderHooks(this.provider);
                    this.store.dispatch(WalletActions.connectWallet());
                    await this.provider.send(
                        'eth_requestAccounts',
                        []
                    )
                    .then((account) => {
                        this.store.dispatch(WalletActions.connectWalletSuccess({walletType: WalletType.metamask}));
                        this.store.dispatch(WalletActions.accountsChanged({account: account[0], chainId: undefined}));
                    })
                    .catch((error: any) => {
                        this.loggingInDevelopMode('eth_requestAccounts', error);
                        this.store.dispatch(WalletActions.connectWalletError());
                    });

                    try {
                        await this.provider.provider.request?.({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: this.appConfig.chainIdHexBinance }]
                        });
                    } catch (error: any) {
                        console.log('error', error);
                        if (error.code === 4902) {
                            try {
                                await this.provider.provider.request?.({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        {
                                            chainId: this.appConfig.chainIdHexBinance,
                                            rpcUrl: this.appConfig.rpcUrlBinance,
                                        },
                                    ],
                                });
                            } catch (addError) {
                                console.error('not this chain');
                                return
                            }
                        } else if (error.code === 4001) { //User reject network change
                            this.loggingInDevelopMode('error.code 4001', error);
                            return
                        }
                    }
                    this.setChainId();

                } else {
                    this.notificationDroneService.error(NotificationDroneEventTypes.NO_WALLET);
                }
                break;
            }
            case WalletType.walletConnect: {
                this.connector = new WalletConnect({
                    bridge: "https://bridge.walletconnect.org",
                    qrcodeModal: QRCodeModal,
                });
                if (!this.connector.connected) {
                    await this.connector.createSession({chainId: Number(this.appConfig.chainIdNumberBinance)});
                    this.createWalletConnectProviderHooks(this.connector);
                } else {
                    //TODO: what when not connected?
                }
            }
        }
    }

    public disconnectWallet(): void {
        if (this.walletType === WalletType.metamask) {
            this.provider?.removeAllListeners();
            this.removeMetamaskProviderHooks(this.provider);
            this.provider = undefined;
            this.store.dispatch(WalletActions.disconnectWallet());
        } else if (this.walletType === WalletType.walletConnect) {
            //TODO: Disconnect wallet connect
        }
    }

    public postSignWalletBeforeBuy(usdcTokenAmount: number, wallet: string): Observable<SignedWalletWithAmount> {
        return this.httpClient.post<SignedWalletWithAmount>(SALE_TOKEN, {wallet, usdcTokenAmount});
    }

    public async signWalletTransaction(signedWalletWithAmount: SignedWalletWithAmount): Promise<void>{
        if (this.provider) {
            try {
                //const adriaTokenContract = AdriaTokenContractFactory.connect(this.provider.getSigner());
                //adriaTokenContract.mint("0x6a72d0119924675A67F0D808C0702db0c7E88480", BigNumber.from("1000000000000000000000000"));
                 const adriaVestingContract = AdriaVestingContractFactory.connect(this.provider.getSigner());
                 const usdcTokenContractFactory = UsdcTokenContractFactory.connect(this.provider.getSigner());
                //  adriaVestingContract.createVestingSchedule("0xe28B9AE23542A7e36D7a26C17A9B550dAB69f3F5", BigNumber.from("1658771909929"), BigNumber.from("0"), BigNumber.from("1000000000000000000000"), BigNumber.from("1721945499000"), BigNumber.from("1000000000000000000000000"))
                //  .then((result) => console.log(result))
                //  .catch((error) => console.log(error));
                //alert(utils.randomBytes(32));
                // const adriaVestingContract = AdriaVestingContractFactory.connect(this.provider.getSigner());


                //hashedETH === "0xBDCDA2D37F3F2E7B269BA0CE4FE821400A2F7FFF4593C364A2D0C396464A93CE"
                //hashedETH sign === "0x02dc0bbf9a070250993e60ddf82407f7b061103bf95c8682803914de1683499a3821bb91870e66e4c7a1630ac9c6bb80490feccb72219eb28aa90852a165b3821b"
                //                    0x06452b01450e09cc10970c4c4d9cd68e176681fed5107023392ddc0f392398190e596ee3c699d034ee7374eb3418f3d23d3105ec1b5cda6d2a1fd33781a629c31c
                //hashed ===    "0xA2D147C2D7F1A91620CB67A289D47DF44DB23A716CA9FDAD4D076A44B1026D63"
                //hashed sign ===    "0x853083dc1d8ae653c4fea564b364befe2286372258574fecb6ffd94ae08f62db2e8c9515ce590f2a6c0d58a63ad3a620685034e23b2fad653a9187cc2036fd321c"
                ///                   0x07fd646befd7f8cb403aedb903817681cfb30e76480a606d3e37cf3f4cc26e166093b6b7269ec10c1ed43f0f6382216f43150f37d532b8de2d555c06dde48d961b
                
                const usdcAmountWithDecimals = BigNumber.from(100).mul(BigNumber.from(10).pow(await usdcTokenContractFactory.decimals()))
                console.log("usdcAmountWithDecimals => " + usdcAmountWithDecimals);
                const userAdress = await (await this.provider.getSigner().getAddress()).toString();
                console.log("user Adress => " + userAdress);
                let messageHash = await adriaVestingContract.getMessageHash(userAdress, usdcAmountWithDecimals, 1);
                console.log(messageHash.toString());
                //let messageEthHashSigned = await adriaVestingContract.getEthSignedMessageHash(messageHash);
                //console.log("messageEthHashSigned => " + messageEthHashSigned.toString());

                let wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

                debugger;
                let hashedSignEth = await wallet.signMessage(ethers.utils.arrayify(messageHash));
                //let messageHashBytes = ethers.utils.arrayify(messageHash)
                const sig = ethers.utils.splitSignature(hashedSignEth);
                console.log("ethers.utils.arrayify(messageHash) => " + ethers.utils.arrayify(messageHash));

                usdcTokenContractFactory.approve("0x6a72d0119924675A67F0D808C0702db0c7E88480", usdcAmountWithDecimals)
                .then((response) => { 
                    if (response)
                        adriaVestingContract.buy(usdcAmountWithDecimals, usdcAmountWithDecimals, 1, sig.v, sig.r, sig.s);
                 })
                 .catch((error) => console.log(error));
                
                //let hashedSignEth = await wallet.signMessage("0xBDCDA2D37F3F2E7B269BA0CE4FE821400A2F7FFF4593C364A2D0C396464A93CE");
                //console.log("hashedSign = " + hashedSign )
                //console.log("hashedSignEth = " + hashedSignEth)
                //const sig = ethers.utils.splitSignature("0x853083dc1d8ae653c4fea564b364befe2286372258574fecb6ffd94ae08f62db2e8c9515ce590f2a6c0d58a63ad3a620685034e23b2fad653a9187cc2036fd321c");
                //const sig = ethers.utils.splitSignature("0x853083dc1d8ae653c4fea564b364befe2286372258574fecb6ffd94ae08f62db2e8c9515ce590f2a6c0d58a63ad3a620685034e23b2fad653a9187cc2036fd321c");
                //const sig = ethers.utils.splitSignature("0x02dc0bbf9a070250993e60ddf82407f7b061103bf95c8682803914de1683499a3821bb91870e66e4c7a1630ac9c6bb80490feccb72219eb28aa90852a165b3821b");
                //const sig = ethers.utils.splitSignature(hashedSignEth);

                //adriaVestingContract.buy(BigNumber.from("1000000000000000000000"), BigNumber.from("1000000000000000000000"), BigNumber.from("0"), sig.v, sig.r, sig.s);
                /*const vesting = AdriaVestingContractFactory.connect(this.provider.getSigner());
                vesting.calculateAdriaTokensForStage(BigNumber.from("100"), BigNumber.from("1")).then((result) => console.log(result))
                .catch((error) => console.log(error));*/
                //adriaVestingContract.changeStage(BigNumber.from("0"), BigNumber.from("500"), BigNumber.from("1658410064"), true)
                //.then((result) => console.log(result))
                //.catch((error) => console.log(error));  






                //let wallet = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");
                
                //let hashedSign = await wallet.signMessage("0xA2D147C2D7F1A91620CB67A289D47DF44DB23A716CA9FDAD4D076A44B1026D63");
                
                //let hashedSignEth = await wallet.signMessage("0xBDCDA2D37F3F2E7B269BA0CE4FE821400A2F7FFF4593C364A2D0C396464A93CE");
                //console.log("hashedSign = " + hashedSign )
                //console.log("hashedSignEth = " + hashedSignEth)
                //const sig = ethers.utils.splitSignature("0x853083dc1d8ae653c4fea564b364befe2286372258574fecb6ffd94ae08f62db2e8c9515ce590f2a6c0d58a63ad3a620685034e23b2fad653a9187cc2036fd321c");
                //const sig = ethers.utils.splitSignature("0x853083dc1d8ae653c4fea564b364befe2286372258574fecb6ffd94ae08f62db2e8c9515ce590f2a6c0d58a63ad3a620685034e23b2fad653a9187cc2036fd321c");
                //const sig = ethers.utils.splitSignature("0x02dc0bbf9a070250993e60ddf82407f7b061103bf95c8682803914de1683499a3821bb91870e66e4c7a1630ac9c6bb80490feccb72219eb28aa90852a165b3821b");
                //const sig = ethers.utils.splitSignature(hashedSignEth);

                /*const vesting = AdriaVestingContractFactory.connect(this.provider.getSigner());
                vesting.calculateAdriaTokensForStage(BigNumber.from("100"), BigNumber.from("1")).then((result) => console.log(result))
                .catch((error) => console.log(error));*/
                //adriaVestingContract.changeStage(BigNumber.from("0"), BigNumber.from("500"), BigNumber.from("1658410064"), true)
                //.then((result) => console.log(result))
                //.catch((error) => console.log(error));  

            } catch (err: any) {
                console.log(err);
            }
        }
    }
}