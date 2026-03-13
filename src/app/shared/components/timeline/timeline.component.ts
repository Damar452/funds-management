import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Transaction, TransactionType } from '@core/models';

@Component({
	selector: 'app-timeline',
	standalone: true,
	imports: [CurrencyPipe, DatePipe],
	templateUrl: './timeline.component.html',
})
export class TimelineComponent {
	@Input() transactions: Transaction[] = [];
	@Input() getFundName: (fundId: number) => string = () => '';

	readonly TransactionType = TransactionType;

	getIcon(type: TransactionType): string {
		return type === TransactionType.SUBSCRIPTION
			? 'M12 6v6m0 0v6m0-6h6m-6 0H6'
			: 'M20 12H4';
	}

	getIconBgClass(type: TransactionType): string {
		return type === TransactionType.SUBSCRIPTION
			? 'bg-green-500'
			: 'bg-red-500';
	}

	getAmountClass(type: TransactionType): string {
		return type === TransactionType.SUBSCRIPTION
			? 'text-red-600'
			: 'text-green-600';
	}

	getAmountPrefix(type: TransactionType): string {
		return type === TransactionType.SUBSCRIPTION ? '-' : '+';
	}

	getTypeLabel(type: TransactionType): string {
		return type === TransactionType.SUBSCRIPTION ? 'Suscripción' : 'Cancelación';
	}
}
