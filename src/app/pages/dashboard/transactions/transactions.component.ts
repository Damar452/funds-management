import { Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionService, FundService } from '@core';
import { DataTableComponent, TableColumn } from '@shared';

@Component({
	selector: 'app-transactions',
	standalone: true,
	imports: [AsyncPipe, CurrencyPipe, DatePipe, DataTableComponent],
	templateUrl: './transactions.component.html',
})
export class TransactionsComponent {
	private readonly transactionService = inject(TransactionService);
	private readonly fundService = inject(FundService);
	
	readonly transactions$ = this.transactionService.transactions$;

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
}
