import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FundService, SubscriptionService } from '@core';
import { Fund, ViewMode } from '@core/models';
import { FundCardComponent, FundsTableComponent, ViewToggleComponent, SearchInputComponent, SubscribeModalComponent, SubscribeData } from '@shared';

@Component({
	selector: 'app-funds-list',
	standalone: true,
	imports: [AsyncPipe, FundCardComponent, FundsTableComponent, ViewToggleComponent, SearchInputComponent, SubscribeModalComponent],
	templateUrl: './funds-list.component.html',
})
export class FundsListComponent {
	private readonly fundService = inject(FundService);
	private readonly subscriptionService = inject(SubscriptionService);
	
	readonly funds$ = this.fundService.funds$;
	readonly subscriptions$ = this.subscriptionService.subscriptions$;
	
	viewMode: ViewMode = ViewMode.CARDS;
	readonly ViewMode = ViewMode;
	filteredFunds: Fund[] = [];
	searchTerm = '';
	
	isModalOpen = false;
	selectedFund: Fund | null = null;

	isSubscribed(fundId: number): boolean {
		return !!this.subscriptionService.getSubscriptionByFundId(fundId);
	}

	getSubscribedFundIds(): number[] {
		return this.subscriptionService
			.getActiveSubscriptions()
			.map((sub) => sub.fundId);
	}

	onSubscribe(fund: Fund): void {
		this.selectedFund = fund;
		this.isModalOpen = true;
	}

	onCloseModal(): void {
		this.isModalOpen = false;
		this.selectedFund = null;
	}

	onConfirmSubscription(data: SubscribeData): void {
		this.subscriptionService
			.subscribe(data.fund.id, data.fund.minAmount, data.notificationMethod)
			.subscribe((result) => {
				if (result.success) {
					console.log('Suscripción exitosa:', result.message);
				} else {
					console.error('Error en suscripción:', result.message);
				}
				this.onCloseModal();
			});
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
