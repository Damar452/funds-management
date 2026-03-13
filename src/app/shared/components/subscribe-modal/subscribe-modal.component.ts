import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Fund, NotificationMethod } from '@core/models';

export interface SubscribeData {
	fund: Fund;
	notificationMethod: NotificationMethod;
}

@Component({
	selector: 'app-subscribe-modal',
	standalone: true,
	imports: [FormsModule, CurrencyPipe],
	templateUrl: './subscribe-modal.component.html',
})
export class SubscribeModalComponent {
	@Input() fund: Fund | null = null;
	@Input() isOpen = false;
	@Output() close = new EventEmitter<void>();
	@Output() confirm = new EventEmitter<SubscribeData>();

	selectedMethod: NotificationMethod = NotificationMethod.EMAIL;

	readonly notificationMethods = [
		{ value: NotificationMethod.EMAIL, label: 'Correo electrónico' },
		{ value: NotificationMethod.SMS, label: 'Mensaje de texto (SMS)' },
	];

	onClose(): void {
		this.close.emit();
	}

	onConfirm(): void {
		if (this.fund) {
			this.confirm.emit({
				fund: this.fund,
				notificationMethod: this.selectedMethod,
			});
		}
	}
}
