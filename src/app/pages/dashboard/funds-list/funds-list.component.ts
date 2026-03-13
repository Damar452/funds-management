import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FundService, SubscriptionService } from '@core';
import { Fund } from '@core/models';
import { FundCardComponent, FundsTableComponent, ViewToggleComponent, ViewMode, SearchInputComponent } from '@shared';

@Component({
	selector: 'app-funds-list',
	standalone: true,
	imports: [AsyncPipe, FundCardComponent, FundsTableComponent, ViewToggleComponent, SearchInputComponent],
	templateUrl: './funds-list.component.html',
})
export class FundsListComponent {
	private readonly fundService = inject(FundService);
	private readonly subscriptionService = inject(SubscriptionService);
	
	readonly funds$ = this.fundService.funds$;
	readonly subscriptions$ = this.subscriptionService.subscriptions$;
	
	viewMode: ViewMode = 'cards';
	filteredFunds: Fund[] = [];
	searchTerm = '';

	isSubscribed(fundId: number): boolean {
		return !!this.subscriptionService.getSubscriptionByFundId(fundId);
	}

	getSubscribedFundIds(): number[] {
		return this.subscriptionService
			.getActiveSubscriptions()
			.map((sub) => sub.fundId);
	}

	onSubscribe(fund: Fund): void {
		console.log('Subscribe to fund:', fund);
	}

	onViewChange(view: ViewMode): void {
		this.viewMode = view;
	}

	onSearch(term: string): void {
		this.searchTerm = term;
		this.filteredFunds = this.fundService.searchFunds(term);
	}

	getFundsToDisplay(allFunds: Fund[]): Fund[] {
		if (!this.searchTerm) {
			return allFunds;
		}
		return this.filteredFunds;
	}
}
