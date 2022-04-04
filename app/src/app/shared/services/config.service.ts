import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ContractsMetadata } from '../models/contracts/contracts-metadata.model';

import CONTRACTS_METADATA from '../config/contracts-metadata.json';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private contractsMetadata?: ContractsMetadata;
  
  constructor(private http: HttpClient) { 
    if (!environment.debug) {
      this.contractsMetadata = CONTRACTS_METADATA;
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
    return this.http.get<ContractsMetadata>(`${environment.externalUrl}assets/contracts/contracts-metadata.json`);
  }

}
