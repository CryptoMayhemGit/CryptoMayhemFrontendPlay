import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractsMetadata } from '@crypto-mayhem-frontend/crypto-mayhem/data-access/models';
import { AppConfig, APP_CONFIG } from '@crypto-mayhem-frontend/crypto-mayhem/config';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private contractsMetadata?: ContractsMetadata;
  
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    if (!this.config.debug) {
      this.contractsMetadata = {
        "name": "",
        "chainId": "",
        "contracts": {}
      };
    } 
  }

  getContractsMetadata(): Observable<ContractsMetadata> {
    return new Observable(observer => {

      if (!this.contractsMetadata) {

        this.fetchContractsMetadata()
          .subscribe({

            next: (contractsMetadata) => {

              this.contractsMetadata = contractsMetadata;
              observer.next(this.contractsMetadata);

            },

            error: () => observer.error(new Error("Contracts are still deploying! Please be patient!"))

        });

      }

    });
  }

  private fetchContractsMetadata(): Observable<ContractsMetadata> {
    return this.http.get<ContractsMetadata>(`${this.config.externalUrl}assets/contracts/contracts-metadata.json`);
  }

}
