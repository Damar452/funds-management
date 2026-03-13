import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SubscribeModalComponent } from './subscribe-modal.component';
import { NotificationMethod } from '@core/models';
import { MOCK_FUNDS } from '@testing';

describe('SubscribeModalComponent', () => {
	let component: SubscribeModalComponent;
	let fixture: ComponentFixture<SubscribeModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SubscribeModalComponent, ReactiveFormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(SubscribeModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('inputs', () => {
		it('should have default isOpen as false', () => {
			expect(component.isOpen).toBeFalse();
		});

		it('should have default fund as null', () => {
			expect(component.fund).toBeNull();
		});
	});

	describe('ngOnChanges', () => {
		it('should create form when modal opens with fund', () => {
			component.fund = MOCK_FUNDS[0];
			component.isOpen = true;
			component.ngOnChanges({
				isOpen: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false },
			});

			expect(component.form).toBeDefined();
			expect(component.form.get('amount')?.value).toBe(MOCK_FUNDS[0].minAmount);
			expect(component.form.get('notificationMethod')?.value).toBeNull();
		});
	});

	describe('form validation', () => {
		beforeEach(() => {
			component.fund = MOCK_FUNDS[0];
			component.isOpen = true;
			component.ngOnChanges({
				isOpen: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false },
			});
		});

		it('should be invalid when notificationMethod is not selected', () => {
			expect(component.form.valid).toBeFalse();
		});

		it('should be valid when all fields are filled', () => {
			component.form.patchValue({
				amount: 100000,
				notificationMethod: NotificationMethod.EMAIL,
			});
			expect(component.form.valid).toBeTrue();
		});

		it('should be invalid when amount is less than minAmount', () => {
			component.form.patchValue({
				amount: 1000,
				notificationMethod: NotificationMethod.EMAIL,
			});
			expect(component.form.get('amount')?.valid).toBeFalse();
		});
	});

	describe('close event', () => {
		it('should emit close when onClose is called', () => {
			spyOn(component.close, 'emit');
			component.onClose();
			expect(component.close.emit).toHaveBeenCalled();
		});
	});

	describe('confirm event', () => {
		beforeEach(() => {
			component.fund = MOCK_FUNDS[0];
			component.isOpen = true;
			component.ngOnChanges({
				isOpen: { currentValue: true, previousValue: false, firstChange: false, isFirstChange: () => false },
			});
		});

		it('should emit confirm with data when form is valid', () => {
			spyOn(component.confirm, 'emit');
			component.form.patchValue({
				amount: 100000,
				notificationMethod: NotificationMethod.EMAIL,
			});

			component.onConfirm();

			expect(component.confirm.emit).toHaveBeenCalledWith({
				fund: MOCK_FUNDS[0],
				amount: 100000,
				notificationMethod: NotificationMethod.EMAIL,
			});
		});

		it('should not emit confirm when form is invalid', () => {
			spyOn(component.confirm, 'emit');
			component.onConfirm();
			expect(component.confirm.emit).not.toHaveBeenCalled();
		});
	});

	describe('notificationMethods', () => {
		it('should have notification methods defined', () => {
			expect(component.notificationMethods.length).toBeGreaterThan(0);
		});
	});
});
