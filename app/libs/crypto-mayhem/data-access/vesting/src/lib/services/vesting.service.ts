import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AppConfig, APP_CONFIG } from "@crypto-mayhem-frontend/crypto-mayhem/config";

import { VestingTokens } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/vesting-model";
import { Observable } from "rxjs";

export const VESTING_BASE = `https://mayhemtdsauthorizationapi.azurewebsites.net`;
export const VESTING_TOPIC_ALL_ACTIVE = (wallet: string, localization: string) => `${VESTING_BASE}/api/Vesting/GetBlockedTokens?walletAddress=${wallet}`;
//export const DAO_TOPIC_ALL_HISTORIC = (wallet: string, skip:number, take: number, localization: string) => `${VESTING_BASE}/Topic/GetAllHistoricTopics/${wallet}/${skip}/${take}/${localization}`;
//export const DAO_SET_VOTE = () => `${VESTING_BASE}/Vote/SetVote`;

@Injectable({ providedIn: "root" })
export class VestingService {
    constructor(
        private readonly httpClient: HttpClient,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig
    ) {}

    public getBlockedTokens(wallet: string, localization: string): Observable<{vestingTokens: VestingTokens}> {
        if (wallet === null || wallet === undefined || wallet === "") {
            wallet = '0x0000000000000000000000000000000000000000';
        }

        return this.httpClient.get<{vestingTokens: VestingTokens}>(VESTING_TOPIC_ALL_ACTIVE(wallet, localization.toUpperCase()));
    }
}