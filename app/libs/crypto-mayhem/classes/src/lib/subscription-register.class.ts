import { Subscription } from "rxjs";


export class SubscriptionRegister {

    private subscriptions: Subscription[] = [];

    add(subscription?: Subscription): void {
        if (subscription) {
          this.subscriptions.push(subscription);
        }
    }
    
    clear(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions = [];
    }

}
