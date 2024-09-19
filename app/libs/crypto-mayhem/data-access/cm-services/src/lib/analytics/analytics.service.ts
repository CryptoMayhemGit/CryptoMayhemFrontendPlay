import { Injectable } from '@angular/core';
import { cookie3Analytics, Cookie3Analytics } from '@cookie3/analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private analytics: Cookie3Analytics;

  constructor() {
    this.analytics = cookie3Analytics({
      siteId: 1548,
      autoDetectWalletAddresses: true,
      autoDetectWalletExtensions: true,
    });
  }

  trackPageView(documentTitle?: string, href?: string): void {
    this.analytics.trackPageView({
      documentTitle: documentTitle || document.title,
      href: href || window.location.href,
    });
  }

  trackEvent(category: string, action: string, value?: number): void {
    this.analytics.trackEvent({
      category,
      action,
      value,
    });
  }
}