import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Fund } from '@core/models';
import { ButtonDirective } from '../../directives';

@Component({
	selector: 'app-fund-card',
	standalone: true,
	imports: [CurrencyPipe, ButtonDirective],
	templateUrl: './fund-card.component.html',
})
export class FundCardComponent {
	@Input({ required: true }) fund!: Fund;
	@Input() isSubscribed = false;
	@Output() subscribe = new EventEmitter<Fund>();

	onSubscribe(): void {
		this.subscribe.emit(this.fund);
	}
}
