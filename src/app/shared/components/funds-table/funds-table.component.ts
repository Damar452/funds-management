import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Fund } from '@core/models';
import { DataTableComponent, TableColumn } from '../data-table/data-table.component';

@Component({
	selector: 'app-funds-table',
	standalone: true,
	imports: [CurrencyPipe, DataTableComponent],
	templateUrl: './funds-table.component.html',
})
export class FundsTableComponent {
	@Input({ required: true }) funds!: Fund[];
	@Input() subscribedFundIds: number[] = [];
	@Output() subscribe = new EventEmitter<Fund>();

	readonly columns: TableColumn[] = [
		{ key: 'category', header: 'Categoría' },
		{ key: 'name', header: 'Nombre' },
		{ key: 'description', header: 'Descripción' },
		{ key: 'minAmount', header: 'Monto Mínimo' },
		{ key: 'action', header: 'Acción' },
	];

	isSubscribed(fundId: number): boolean {
		return this.subscribedFundIds.includes(fundId);
	}

	onSubscribe(fund: Fund): void {
		this.subscribe.emit(fund);
	}
}
