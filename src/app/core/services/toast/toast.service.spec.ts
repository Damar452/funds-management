import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastType } from '../../models';

describe('ToastService', () => {
	let service: ToastService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ToastService],
		});
		service = TestBed.inject(ToastService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('success', () => {
		it('should add a success toast', () => {
			service.success('Título', 'Mensaje');

			service.toasts$.subscribe((toasts) => {
				expect(toasts.length).toBe(1);
				expect(toasts[0].type).toBe(ToastType.SUCCESS);
				expect(toasts[0].title).toBe('Título');
				expect(toasts[0].message).toBe('Mensaje');
			});
		});
	});

	describe('error', () => {
		it('should add an error toast', () => {
			service.error('Error', 'Descripción del error');

			service.toasts$.subscribe((toasts) => {
				expect(toasts.length).toBe(1);
				expect(toasts[0].type).toBe(ToastType.ERROR);
				expect(toasts[0].title).toBe('Error');
			});
		});
	});

	describe('info', () => {
		it('should add an info toast', () => {
			service.info('Info', 'Mensaje informativo');

			service.toasts$.subscribe((toasts) => {
				expect(toasts.length).toBe(1);
				expect(toasts[0].type).toBe(ToastType.INFO);
			});
		});
	});

	describe('warning', () => {
		it('should add a warning toast', () => {
			service.warning('Advertencia', 'Mensaje de advertencia');

			service.toasts$.subscribe((toasts) => {
				expect(toasts.length).toBe(1);
				expect(toasts[0].type).toBe(ToastType.WARNING);
			});
		});
	});

	describe('remove', () => {
		it('should remove a toast by id', () => {
			service.success('Test', 'Test message');

			let toastId: string;
			service.toasts$.subscribe((toasts) => {
				if (toasts.length > 0) {
					toastId = toasts[0].id;
				}
			});

			service.remove(toastId!);

			service.toasts$.subscribe((toasts) => {
				expect(toasts.length).toBe(0);
			});
		});
	});

	describe('clear', () => {
		it('should remove all toasts', () => {
			service.success('Test 1');
			service.error('Test 2');
			service.info('Test 3');

			service.clear();

			service.toasts$.subscribe((toasts) => {
				expect(toasts.length).toBe(0);
			});
		});
	});

	describe('auto-remove', () => {
		it('should auto-remove toast after duration', fakeAsync(() => {
			service.success('Test', 'Message', 1000);

			let toastCount = 0;
			service.toasts$.subscribe((toasts) => {
				toastCount = toasts.length;
			});

			expect(toastCount).toBe(1);

			tick(1000);

			expect(toastCount).toBe(0);
		}));
	});
});
