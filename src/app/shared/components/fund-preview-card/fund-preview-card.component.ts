import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FundCategory } from '@core/models';

@Component({
	selector: 'app-fund-preview-card',
	standalone: true,
	imports: [NgClass],
	templateUrl: './fund-preview-card.component.html',
})
export class FundPreviewCardComponent {
	@Input({ required: true }) category!: FundCategory;
	@Input({ required: true }) categoryLabel!: string;
	@Input({ required: true }) title!: string;
	@Input({ required: true }) description!: string;
	@Input({ required: true }) minAmount!: number;

	get categoryColorClass(): string {
		return this.category === 'FPV' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent';
	}

	get amountColorClass(): string {
		return this.category === 'FPV' ? 'text-primary' : 'text-accent';
	}

	get formattedAmount(): string {
		return `$${this.minAmount.toLocaleString('es-CO')} COP`;
	}
}
