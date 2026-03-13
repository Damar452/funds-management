import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubscriptionService, FundService } from '@core';

@Component({
	selector: 'app-subscriptions',
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, DatePipe, RouterLink],
	templateUrl: './subscriptions.component.html',
})
export class SubscriptionsComponent {
	private readonly subscriptionService = inject(SubscriptionService);
	private readonly fundService = inject(FundService);
	
	readonly subscriptions$ = this.subscriptionService.subscriptions$;

	getFundName(fundId: number): string {
		const fund = this.fundService.getFundById(fundId);
		return fund?.name ?? 'Fondo desconocido';
	}

	cancelSubscription(subscriptionId: number): void {
		this.subscriptionService.cancelSubscription(subscriptionId).subscribe();
	}
}
