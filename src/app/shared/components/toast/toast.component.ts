import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ToastService } from '@core';
import { Toast, ToastType } from '@core/models';

@Component({
	selector: 'app-toast',
	standalone: true,
	imports: [AsyncPipe],
	templateUrl: './toast.component.html',
})
export class ToastComponent {
	private readonly toastService = inject(ToastService);
	readonly toasts$ = this.toastService.toasts$;
	readonly ToastType = ToastType;

	getIcon(type: ToastType): string {
		const icons: Record<ToastType, string> = {
			[ToastType.SUCCESS]: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
			[ToastType.ERROR]: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
			[ToastType.INFO]: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
			[ToastType.WARNING]: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
		};
		return icons[type];
	}

	getColorClasses(type: ToastType): string {
		const colors: Record<ToastType, string> = {
			[ToastType.SUCCESS]: 'bg-green-50 border-green-200 text-green-800',
			[ToastType.ERROR]: 'bg-red-50 border-red-200 text-red-800',
			[ToastType.INFO]: 'bg-blue-50 border-blue-200 text-blue-800',
			[ToastType.WARNING]: 'bg-yellow-50 border-yellow-200 text-yellow-800',
		};
		return colors[type];
	}

	getIconColorClasses(type: ToastType): string {
		const colors: Record<ToastType, string> = {
			[ToastType.SUCCESS]: 'text-green-500',
			[ToastType.ERROR]: 'text-red-500',
			[ToastType.INFO]: 'text-blue-500',
			[ToastType.WARNING]: 'text-yellow-500',
		};
		return colors[type];
	}

	remove(id: string): void {
		this.toastService.remove(id);
	}
}
