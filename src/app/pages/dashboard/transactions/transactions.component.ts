import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService, FundService } from '@core';
import { Transaction, TransactionType, ViewMode } from '@core/models';
import { DataTableComponent, TableColumn, SearchInputComponent, ViewToggleComponent, TimelineComponent } from '@shared';

@Component({
	selector: 'app-transactions',
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, DatePipe, DataTableComponent, SearchInputComponent, ViewToggleComponent, TimelineComponent],
	templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
	private readonly transactionService = inject(TransactionService);
	private readonly fundService = inject(FundService);
	
	readonly transactions$ = this.transactionService.transactions$;
	readonly TransactionType = TransactionType;
	
	searchTerm = '';
	viewMode: ViewMode = ViewMode.TABLE;
	readonly ViewMode = ViewMode;

	readonly columns: TableColumn[] = [
		{ key: 'type', header: 'Tipo' },
		{ key: 'fund', header: 'Fondo' },
		{ key: 'amount', header: 'Monto' },
		{ key: 'balanceBefore', header: 'Saldo Anterior' },
		{ key: 'balanceAfter', header: 'Saldo Posterior' },
		{ key: 'createdAt', header: 'Fecha' },
	];

	getFundName(fundId: number): string {
		const fund = this.fundService.getFundById(fundId);
		return fund?.name ?? 'Fondo desconocido';
	}

	getFilteredTransactions(transactions: Transaction[]): Transaction[] {
		if (!this.searchTerm.trim()) {
			return transactions;
		}
		
		const lowerTerm = this.searchTerm.toLowerCase();
		return transactions.filter((tx) => {
			const fundName = this.getFundName(tx.fundId).toLowerCase();
			const type = tx.type === TransactionType.SUBSCRIPTION ? 'suscripción' : 'cancelación';
			return fundName.includes(lowerTerm) || type.includes(lowerTerm);
		});
	}

	onSearch(term: string): void {
		this.searchTerm = term;
	}

	onViewChange(view: ViewMode): void {
		this.viewMode = view;
	}
}
