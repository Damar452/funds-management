import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FundService, SubscriptionService, ToastService } from '@core';
import { Fund, ViewMode, NOTIFICATION_METHOD_LABELS, SubscribeData } from '@core/models';
import { FundCardComponent, FundsTableComponent, ViewToggleComponent, SearchInputComponent, SubscribeModalComponent } from '@shared';

@Component({
	selector: 'app-funds-list',
	standalone: true,
	imports: [AsyncPipe, FundCardComponent, FundsTableComponent, ViewToggleComponent, SearchInputComponent, SubscribeModalComponent],
	templateUrl: './funds-list.component.html',
})
export class FundsListComponent implements OnDestroy {
	private readonly fundService = inject(FundService);
	private readonly subscriptionService = inject(SubscriptionService);
	private readonly toastService = inject(ToastService);
	private readonly destroy$ = new Subject<void>();
	
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
		const notificationText = NOTIFICATION_METHOD_LABELS[data.notificationMethod];
		this.subscriptionService
			.subscribe(data.fund.id, data.amount, data.notificationMethod)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => {
					this.toastService.success('Suscripción exitosa', `Se enviará confirmación por ${notificationText}`);
					this.onCloseModal();
				},
				error: (error: Error) => {
					this.toastService.error('Error en suscripción', error.message);
					this.onCloseModal();
				},
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

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
