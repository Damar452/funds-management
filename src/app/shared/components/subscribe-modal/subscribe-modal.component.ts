import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Fund, SubscribeData } from '@core/models';
import { notificationMethods } from './subscribe-modal.consts';
import { ButtonDirective, InputDirective } from '../../directives';

@Component({
	selector: 'app-subscribe-modal',
	standalone: true,
	imports: [ReactiveFormsModule, CurrencyPipe, ButtonDirective, InputDirective],
	templateUrl: './subscribe-modal.component.html',
})
export class SubscribeModalComponent implements OnChanges {
	private readonly fb = inject(FormBuilder);
	
	@Input() fund: Fund | null = null;
	@Input() isOpen = false;
	@Output() close = new EventEmitter<void>();
	@Output() confirm = new EventEmitter<SubscribeData>();

	form!: FormGroup;
	readonly notificationMethods = notificationMethods;

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['isOpen'] && this.isOpen && this.fund) {
			this.form = this.fb.group({
				amount: [this.fund.minAmount, [Validators.required, Validators.min(this.fund.minAmount)]],
				notificationMethod: [null, Validators.required],
			});
		}
	}

	onClose(): void {
		this.close.emit();
	}

	onConfirm(): void {
		if (this.fund && this.form.valid) {
			this.confirm.emit({
				fund: this.fund,
				amount: this.form.value.amount,
				notificationMethod: this.form.value.notificationMethod,
			});
		}
	}
}
