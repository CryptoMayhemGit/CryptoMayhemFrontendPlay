import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WalletService {
    constructor(
        private readonly httpClient: HttpClient
    ) {}
}