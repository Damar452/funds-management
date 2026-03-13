import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SubscriptionService, FundService } from '@core';
import { FundSubscription, SubscriptionStatus, ViewMode } from '@core/models';
import { SearchInputComponent, ViewToggleComponent, DataTableComponent, TableColumn } from '@shared';
import { SUBSCRIPTIONS_TABLE_COLUMNS } from './subscriptions.consts';

@Component({
	selector: 'app-subscriptions',
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, DatePipe, RouterLink, SearchInputComponent, ViewToggleComponent, DataTableComponent],
	templateUrl: './subscriptions.component.html',
})
export class SubscriptionsComponent {
	private readonly subscriptionService = inject(SubscriptionService);
	private readonly fundService = inject(FundService);
	
	readonly subscriptions$ = this.subscriptionService.subscriptions$;
	readonly SubscriptionStatus = SubscriptionStatus;
	readonly columns: TableColumn[] = SUBSCRIPTIONS_TABLE_COLUMNS;
	
	searchTerm = '';
	viewMode: ViewMode = ViewMode.CARDS;
	readonly ViewMode = ViewMode;
	

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

	cancelSubscription(subscriptionId: number): void {
		this.subscriptionService.cancelSubscription(subscriptionId).subscribe((result) => {
			if (result.success) {
				console.log('Cancelación exitosa:', result.message);
			} else {
				console.error('Error en cancelación:', result.message);
			}
		});
	}
}
