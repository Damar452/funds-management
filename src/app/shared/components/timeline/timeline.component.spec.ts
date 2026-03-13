import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineComponent } from './timeline.component';
import { TransactionType, NotificationMethod } from '@core/models';

describe('TimelineComponent', () => {
	let component: TimelineComponent;
	let fixture: ComponentFixture<TimelineComponent>;

	const mockTransactions = [
		{
			id: 1,
			userId: 1,
			fundId: 1,
			subscriptionId: 1,
			type: TransactionType.SUBSCRIPTION,
			amount: 75000,
			balanceBefore: 500000,
			balanceAfter: 425000,
			notificationMethod: NotificationMethod.EMAIL,
			createdAt: '2024-01-01',
		},
		{
			id: 2,
			userId: 1,
			fundId: 1,
			subscriptionId: 1,
			type: TransactionType.CANCELLATION,
			amount: 75000,
			balanceBefore: 425000,
			balanceAfter: 500000,
			notificationMethod: NotificationMethod.EMAIL,
			createdAt: '2024-01-02',
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TimelineComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TimelineComponent);
		component = fixture.componentInstance;
		component.transactions = mockTransactions;
		component.getFundName = (id: number) => `Fund ${id}`;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('getIcon', () => {
		it('should return plus icon for subscription', () => {
			const icon = component.getIcon(TransactionType.SUBSCRIPTION);
			expect(icon).toContain('M12 6v6');
		});

		it('should return minus icon for cancellation', () => {
			const icon = component.getIcon(TransactionType.CANCELLATION);
			expect(icon).toContain('M20 12H4');
		});
	});

	describe('getIconBgClass', () => {
		it('should return green for subscription', () => {
			expect(component.getIconBgClass(TransactionType.SUBSCRIPTION)).toBe('bg-green-500');
		});

		it('should return red for cancellation', () => {
			expect(component.getIconBgClass(TransactionType.CANCELLATION)).toBe('bg-red-500');
		});
	});

	describe('getAmountClass', () => {
		it('should return red for subscription', () => {
			expect(component.getAmountClass(TransactionType.SUBSCRIPTION)).toBe('text-red-600');
		});

		it('should return green for cancellation', () => {
			expect(component.getAmountClass(TransactionType.CANCELLATION)).toBe('text-green-600');
		});
	});

	describe('getAmountPrefix', () => {
		it('should return minus for subscription', () => {
			expect(component.getAmountPrefix(TransactionType.SUBSCRIPTION)).toBe('-');
		});

		it('should return plus for cancellation', () => {
			expect(component.getAmountPrefix(TransactionType.CANCELLATION)).toBe('+');
		});
	});

	describe('getTypeLabel', () => {
		it('should return Suscripción for subscription', () => {
			expect(component.getTypeLabel(TransactionType.SUBSCRIPTION)).toBe('Suscripción');
		});

		it('should return Cancelación for cancellation', () => {
			expect(component.getTypeLabel(TransactionType.CANCELLATION)).toBe('Cancelación');
		});
	});
});
