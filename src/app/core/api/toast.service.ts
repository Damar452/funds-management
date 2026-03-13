import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast, ToastType } from '../models';

const DEFAULT_DURATION = 4000;

const DEFAULT_TITLES: Record<ToastType, string> = {
	[ToastType.SUCCESS]: '¡Éxito!',
	[ToastType.ERROR]: 'Error',
	[ToastType.INFO]: 'Información',
	[ToastType.WARNING]: 'Advertencia',
};

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private readonly toastsSubject = new BehaviorSubject<Toast[]>([]);
	readonly toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

	private generateId(): string {
		return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
	}

	private show(type: ToastType, title: string, message?: string, duration: number = DEFAULT_DURATION): void {
		const toast: Toast = {
			id: this.generateId(),
			type,
			title,
			message,
			duration,
		};

		const currentToasts = this.toastsSubject.getValue();
		this.toastsSubject.next([...currentToasts, toast]);

		if (duration > 0) {
			setTimeout(() => this.remove(toast.id), duration);
		}
	}

	success(title: string, message?: string, duration?: number): void {
		this.show(ToastType.SUCCESS, title, message, duration);
	}

	error(title: string, message?: string, duration?: number): void {
		this.show(ToastType.ERROR, title, message, duration);
	}

	info(title: string, message?: string, duration?: number): void {
		this.show(ToastType.INFO, title, message, duration);
	}

	warning(title: string, message?: string, duration?: number): void {
		this.show(ToastType.WARNING, title, message, duration);
	}

	remove(id: string): void {
		const currentToasts = this.toastsSubject.getValue();
		this.toastsSubject.next(currentToasts.filter((toast) => toast.id !== id));
	}

	clear(): void {
		this.toastsSubject.next([]);
	}
}
