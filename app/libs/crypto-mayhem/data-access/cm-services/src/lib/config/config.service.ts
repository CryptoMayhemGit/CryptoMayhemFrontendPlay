import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractsMetadata } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/models';
import { AppConfig, APP_CONFIG } from '@crypto-mayhem-frontend/crypto-mayhem/config';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  getContractsMetadata(): Observable<ContractsMetadata> {
    return this.http.get<ContractsMetadata>(`${this.config.externalUrl}assets/contracts/contracts-metadata.json`);
  }

}
