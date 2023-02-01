import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppConfig, APP_CONFIG } from "@crypto-mayhem-frontend/crypto-mayhem/config";
import { NotificationsService } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone";
import { Store } from "@ngrx/store";

import { DaoTopic, SetVoteRequest } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model";
import { Observable } from "rxjs";

export const DAO_BASE = `https://mayhemdaoapi.azurewebsites.net`;
export const DAO_TOPIC_ALL_ACTIVE = (wallet: string,localization: string) => `${DAO_BASE}/Topic/GetAllActiveTopics/${wallet}/${localization}`;
export const DAO_TOPIC_ALL_HISTORIC = (skip:number, take: number, localization: string) => `${DAO_BASE}/Topic/GetAllHistoricTopics/${skip}/${take}/${localization}`;
export const DAO_SET_VOTE = () => `${DAO_BASE}/Vote/SetVote`;

@Injectable({ providedIn: "root" })
export class DAOService {
    constructor(
        private readonly httpClient: HttpClient,
        private store: Store,
        private readonly notificationsService: NotificationsService,
        private router: Router,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig
    ) {}

    public getDaoAllActiveTopics(wallet: string, localization: string): Observable<{topics: DaoTopic[]}> {
        if (wallet === null || wallet === undefined || wallet === "") {
            wallet = '0x0000000000000000000000000000000000000000';
        }
        return this.httpClient.get<{topics: DaoTopic[]}>(DAO_TOPIC_ALL_ACTIVE(wallet, localization.toUpperCase()));
    }

    public getAllHistoricTopics(skip: number, take: number, localization: string): Observable<{topics: DaoTopic[]}> {
        return this.httpClient.get<{topics: DaoTopic[]}>(DAO_TOPIC_ALL_HISTORIC(skip, take, localization));
    }

    public postDaoVoteWithSignature(setVoteRequest: SetVoteRequest): Observable<any> {
        return this.httpClient.post(DAO_SET_VOTE(), setVoteRequest);
    }
}