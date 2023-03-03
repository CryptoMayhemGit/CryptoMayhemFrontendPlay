import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  AppConfig,
  APP_CONFIG,
} from '@crypto-mayhem-frontend/crypto-mayhem/config';
import { Observable } from 'rxjs';
import { News } from './news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  getMediumFeed(): Observable<News> {
    return this.http.get<News>(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@crypto_mayhem`);
  }
}
