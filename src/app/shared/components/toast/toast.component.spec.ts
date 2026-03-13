import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from '@core';
import { ToastType } from '@core/models';
import { BehaviorSubject } from 'rxjs';

describe('ToastComponent', () => {
	let component: ToastComponent;
	let fixture: ComponentFixture<ToastComponent>;
	let toastServiceSpy: jasmine.SpyObj<ToastService>;
	let toastsSubject: BehaviorSubject<any[]>;

	beforeEach(async () => {
		toastsSubject = new BehaviorSubject<any[]>([]);
		toastServiceSpy = jasmine.createSpyObj('ToastService', ['remove'], {
			toasts$: toastsSubject.asObservable(),
		});

		await TestBed.configureTestingModule({
			imports: [ToastComponent],
			providers: [{ provide: ToastService, useValue: toastServiceSpy }],
		}).compileComponents();

		fixture = TestBed.createComponent(ToastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('getIcon', () => {
		it('should return correct icon for SUCCESS', () => {
			const icon = component.getIcon(ToastType.SUCCESS);
			expect(icon).toContain('M9 12l2 2');
		});

		it('should return correct icon for ERROR', () => {
			const icon = component.getIcon(ToastType.ERROR);
			expect(icon).toContain('M10 14l2-2');
		});

		it('should return correct icon for INFO', () => {
			const icon = component.getIcon(ToastType.INFO);
			expect(icon).toContain('M13 16h-1v-4');
		});

		it('should return correct icon for WARNING', () => {
			const icon = component.getIcon(ToastType.WARNING);
			expect(icon).toContain('M12 9v2m0 4');
		});
	});

	describe('getColorClasses', () => {
		it('should return green classes for SUCCESS', () => {
			const classes = component.getColorClasses(ToastType.SUCCESS);
			expect(classes).toContain('bg-green-50');
		});

		it('should return red classes for ERROR', () => {
			const classes = component.getColorClasses(ToastType.ERROR);
			expect(classes).toContain('bg-red-50');
		});

		it('should return blue classes for INFO', () => {
			const classes = component.getColorClasses(ToastType.INFO);
			expect(classes).toContain('bg-blue-50');
		});

		it('should return yellow classes for WARNING', () => {
			const classes = component.getColorClasses(ToastType.WARNING);
			expect(classes).toContain('bg-yellow-50');
		});
	});

	describe('remove', () => {
		it('should call toastService.remove with id', () => {
			component.remove('toast-123');
			expect(toastServiceSpy.remove).toHaveBeenCalledWith('toast-123');
		});
	});
});
