import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SubscriptionService, FundService, ToastService } from '@core';
import { FundSubscription, SubscriptionStatus, ViewMode, NOTIFICATION_METHOD_LABELS } from '@core/models';
import { SearchInputComponent, ViewToggleComponent, DataTableComponent, TableColumn, ConfirmModalComponent } from '@shared';
import { SUBSCRIPTIONS_TABLE_COLUMNS } from './subscriptions.consts';

@Component({
	selector: 'app-subscriptions',
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, DatePipe, RouterLink, SearchInputComponent, ViewToggleComponent, DataTableComponent, ConfirmModalComponent],
	templateUrl: './subscriptions.component.html',
})
export class SubscriptionsComponent implements OnDestroy {
	private readonly subscriptionService = inject(SubscriptionService);
	private readonly fundService = inject(FundService);
	private readonly toastService = inject(ToastService);
	private readonly destroy$ = new Subject<void>();
	
	readonly subscriptions$ = this.subscriptionService.subscriptions$;
	readonly SubscriptionStatus = SubscriptionStatus;
	readonly columns: TableColumn[] = SUBSCRIPTIONS_TABLE_COLUMNS;
	
	searchTerm = '';
	viewMode: ViewMode = ViewMode.CARDS;
	readonly ViewMode = ViewMode;
	
	isConfirmModalOpen = false;
	subscriptionToCancel: FundSubscription | null = null;

	getFundName(fundId: number): string {
		const fund = this.fundService.getFundById(fundId);
		return fund?.name ?? 'Fondo desconocido';
	}

	getFundCategory(fundId: number): string {
		const fund = this.fundService.getFundById(fundId);
		return fund?.category ?? '';
	}

	getActiveSubscriptions(subscriptions: FundSubscription[]): FundSubscription[] {
		const active = subscriptions.filter((sub) => sub.status === SubscriptionStatus.ACTIVE);
		
		if (!this.searchTerm.trim()) {
			return active;
		}
		
		const lowerTerm = this.searchTerm.toLowerCase();
		return active.filter((sub) => {
			const fundName = this.getFundName(sub.fundId).toLowerCase();
			const fundCategory = this.getFundCategory(sub.fundId).toLowerCase();
			return fundName.includes(lowerTerm) || fundCategory.includes(lowerTerm);
		});
	}

	onSearch(term: string): void {
		this.searchTerm = term;
	}

	onViewChange(view: ViewMode): void {
		this.viewMode = view;
	}

	openCancelModal(subscription: FundSubscription): void {
		this.subscriptionToCancel = subscription;
		this.isConfirmModalOpen = true;
	}

	closeCancelModal(): void {
		this.isConfirmModalOpen = false;
		this.subscriptionToCancel = null;
	}

	confirmCancelSubscription(): void {
		if (!this.subscriptionToCancel) return;
		
		const notificationText = NOTIFICATION_METHOD_LABELS[this.subscriptionToCancel.notificationMethod];
		
		this.subscriptionService.cancelSubscription(this.subscriptionToCancel.id)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: () => {
					this.toastService.success('Cancelación exitosa', `Se enviará confirmación por ${notificationText}`);
					this.closeCancelModal();
				},
				error: (error: Error) => {
					this.toastService.error('Error en cancelación', error.message);
					this.closeCancelModal();
				},
			});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
