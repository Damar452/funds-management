import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
	selector: 'app-feature-card',
	standalone: true,
	imports: [NgClass],
	templateUrl: './feature-card.component.html',
})
export class FeatureCardComponent {
	@Input({ required: true }) title!: string;
	@Input({ required: true }) description!: string;
	@Input({ required: true }) icon!: string;
	@Input() colorClass: 'primary' | 'secondary' | 'accent' = 'primary';

	get bgColorClass(): string {
		const colors = {
			primary: 'bg-primary/10',
			secondary: 'bg-secondary/10',
			accent: 'bg-accent/10',
		};
		return colors[this.colorClass];
	}

	get textColorClass(): string {
		const colors = {
			primary: 'text-primary',
			secondary: 'text-secondary',
			accent: 'text-accent',
		};
		return colors[this.colorClass];
	}
}
