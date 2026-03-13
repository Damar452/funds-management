import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonDirective } from '../../directives';

export type ConfirmModalType = 'danger' | 'warning' | 'info';

@Component({
	selector: 'app-confirm-modal',
	standalone: true,
	imports: [ButtonDirective],
	templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent {
	@Input() isOpen = false;
	@Input() title = '¿Estás seguro?';
	@Input() message = '';
	@Input() confirmText = 'Confirmar';
	@Input() cancelText = 'Cancelar';
	@Input() type: ConfirmModalType = 'danger';
	@Output() confirm = new EventEmitter<void>();
	@Output() cancel = new EventEmitter<void>();

	get confirmButtonClasses(): string {
		const classes: Record<ConfirmModalType, string> = {
			danger: 'bg-secondary hover:opacity-90',
			warning: 'bg-yellow-500 hover:opacity-90',
			info: 'bg-primary hover:opacity-90',
		};
		return classes[this.type];
	}

	get iconPath(): string {
		const icons: Record<ConfirmModalType, string> = {
			danger: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
			warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
			info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		};
		return icons[this.type];
	}

	get iconColorClasses(): string {
		const colors: Record<ConfirmModalType, string> = {
			danger: 'text-secondary bg-secondary/10',
			warning: 'text-yellow-500 bg-yellow-50',
			info: 'text-primary bg-primary/10',
		};
		return colors[this.type];
	}

	onConfirm(): void {
		this.confirm.emit();
	}

	onCancel(): void {
		this.cancel.emit();
	}
}
