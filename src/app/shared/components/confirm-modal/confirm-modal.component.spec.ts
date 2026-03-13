import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
	let component: ConfirmModalComponent;
	let fixture: ComponentFixture<ConfirmModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ConfirmModalComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ConfirmModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('inputs', () => {
		it('should have default values', () => {
			expect(component.isOpen).toBeFalse();
			expect(component.title).toBe('¿Estás seguro?');
			expect(component.confirmText).toBe('Confirmar');
			expect(component.cancelText).toBe('Cancelar');
			expect(component.type).toBe('danger');
		});
	});

	describe('confirmButtonClasses', () => {
		it('should return danger classes for danger type', () => {
			component.type = 'danger';
			expect(component.confirmButtonClasses).toContain('bg-secondary');
		});

		it('should return warning classes for warning type', () => {
			component.type = 'warning';
			expect(component.confirmButtonClasses).toContain('bg-yellow-500');
		});

		it('should return info classes for info type', () => {
			component.type = 'info';
			expect(component.confirmButtonClasses).toContain('bg-primary');
		});
	});

	describe('iconPath', () => {
		it('should return icon path for each type', () => {
			component.type = 'danger';
			expect(component.iconPath).toBeDefined();

			component.type = 'warning';
			expect(component.iconPath).toBeDefined();

			component.type = 'info';
			expect(component.iconPath).toBeDefined();
		});
	});

	describe('events', () => {
		it('should emit confirm when onConfirm is called', () => {
			spyOn(component.confirm, 'emit');
			component.onConfirm();
			expect(component.confirm.emit).toHaveBeenCalled();
		});

		it('should emit cancel when onCancel is called', () => {
			spyOn(component.cancel, 'emit');
			component.onCancel();
			expect(component.cancel.emit).toHaveBeenCalled();
		});
	});
});
