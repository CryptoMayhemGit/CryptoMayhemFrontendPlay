import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppConfig, APP_CONFIG } from "@crypto-mayhem-frontend/crypto-mayhem/config";
import { NotificationsService } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/notification-drone";
import { Store } from "@ngrx/store";

import { DaoTopic } from "@crypto-mayhem-frontend/crypto-mayhem/data-access/dao-model";
import { Observable } from "rxjs";

export const DAO_BASE = `https://mayhemdaoapi.azurewebsites.net`;
export const DAO_TOPIC_ALL_ACTIVE = (localization: string) => `${DAO_BASE}/Topic/GetAllActiveTopics?Localization=${localization}`;
export const DAO_TOPIC_ALL_HISTORIC = (skip:number, take: number, localization: string) => `${DAO_BASE}/Topic/GetAllHistoricTopics?Skip=${skip}&Take=${take}&Localization=${localization}`;

@Injectable({ providedIn: "root" })
export class DAOService {
    constructor(
        private readonly httpClient: HttpClient,
        private store: Store,
        private readonly notificationsService: NotificationsService,
        private router: Router,
        @Inject(APP_CONFIG) private readonly appConfig: AppConfig
    ) {}

    getDaoAllActiveTopics(): Observable<{topics: DaoTopic[]}> {
        return this.httpClient.get<{topics: DaoTopic[]}>(DAO_TOPIC_ALL_ACTIVE('polish'));
    }

    getAllHistoricTopics(skip: number, take: number): Observable<{topics: DaoTopic[]}> {
        return this.httpClient.get<{topics: DaoTopic[]}>(DAO_TOPIC_ALL_HISTORIC(skip, take, 'polish'));
    }
}