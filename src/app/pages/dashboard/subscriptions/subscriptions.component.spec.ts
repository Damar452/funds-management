import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SubscriptionsComponent } from './subscriptions.component';
import { SubscriptionService, FundService, ToastService } from '@core';
import { ViewMode, SubscriptionStatus, NotificationMethod } from '@core/models';
import { MOCK_FUNDS, MOCK_SUBSCRIPTIONS } from '@testing';
import { BehaviorSubject, of, throwError } from 'rxjs';

describe('SubscriptionsComponent', () => {
	let component: SubscriptionsComponent;
	let fixture: ComponentFixture<SubscriptionsComponent>;
	let subscriptionServiceSpy: jasmine.SpyObj<SubscriptionService>;
	let fundServiceSpy: jasmine.SpyObj<FundService>;
	let toastServiceSpy: jasmine.SpyObj<ToastService>;
	let subscriptionsSubject: BehaviorSubject<any[]>;

	beforeEach(async () => {
		subscriptionsSubject = new BehaviorSubject<any[]>(MOCK_SUBSCRIPTIONS);

		subscriptionServiceSpy = jasmine.createSpyObj(
			'SubscriptionService',
			['cancelSubscription'],
			{ subscriptions$: subscriptionsSubject.asObservable() }
		);

		fundServiceSpy = jasmine.createSpyObj('FundService', ['getFundById']);
		fundServiceSpy.getFundById.and.callFake((id: number) => MOCK_FUNDS.find((f) => f.id === id));

		toastServiceSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);

		await TestBed.configureTestingModule({
			imports: [SubscriptionsComponent],
			providers: [
				provideRouter([]),
				{ provide: SubscriptionService, useValue: subscriptionServiceSpy },
				{ provide: FundService, useValue: fundServiceSpy },
				{ provide: ToastService, useValue: toastServiceSpy },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(SubscriptionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('initial state', () => {
		it('should have default viewMode as CARDS', () => {
			expect(component.viewMode).toBe(ViewMode.CARDS);
		});

		it('should have confirm modal closed', () => {
			expect(component.isConfirmModalOpen).toBeFalse();
			expect(component.subscriptionToCancel).toBeNull();
		});
	});

	describe('getFundName', () => {
		it('should return fund name when found', () => {
			const name = component.getFundName(1);
			expect(name).toBe(MOCK_FUNDS[0].name);
		});

		it('should return default text when fund not found', () => {
			fundServiceSpy.getFundById.and.returnValue(undefined);
			const name = component.getFundName(999);
			expect(name).toBe('Fondo desconocido');
		});
	});

	describe('getActiveSubscriptions', () => {
		it('should filter only active subscriptions', () => {
			const result = component.getActiveSubscriptions(MOCK_SUBSCRIPTIONS);
			expect(result.every((s) => s.status === SubscriptionStatus.ACTIVE)).toBeTrue();
		});

		it('should filter by search term', () => {
			component.searchTerm = 'RECAUDADORA';
			const result = component.getActiveSubscriptions(MOCK_SUBSCRIPTIONS);
			expect(result.length).toBeLessThanOrEqual(MOCK_SUBSCRIPTIONS.length);
		});
	});

	describe('onSearch', () => {
		it('should update searchTerm', () => {
			component.onSearch('test');
			expect(component.searchTerm).toBe('test');
		});
	});

	describe('onViewChange', () => {
		it('should update viewMode', () => {
			component.onViewChange(ViewMode.TABLE);
			expect(component.viewMode).toBe(ViewMode.TABLE);
		});
	});

	describe('cancel modal', () => {
		it('should open modal with subscription', () => {
			component.openCancelModal(MOCK_SUBSCRIPTIONS[0]);
			expect(component.isConfirmModalOpen).toBeTrue();
			expect(component.subscriptionToCancel).toEqual(MOCK_SUBSCRIPTIONS[0]);
		});

		it('should close modal and clear subscription', () => {
			component.isConfirmModalOpen = true;
			component.subscriptionToCancel = MOCK_SUBSCRIPTIONS[0];

			component.closeCancelModal();

			expect(component.isConfirmModalOpen).toBeFalse();
			expect(component.subscriptionToCancel).toBeNull();
		});
	});

	describe('confirmCancelSubscription', () => {
		it('should not call service if no subscription selected', () => {
			component.subscriptionToCancel = null;
			component.confirmCancelSubscription();
			expect(subscriptionServiceSpy.cancelSubscription).not.toHaveBeenCalled();
		});

		it('should show success toast on successful cancellation', () => {
			component.subscriptionToCancel = MOCK_SUBSCRIPTIONS[0];
			subscriptionServiceSpy.cancelSubscription.and.returnValue(of({ success: true, message: 'OK' }));

			component.confirmCancelSubscription();

			expect(toastServiceSpy.success).toHaveBeenCalled();
		});

		it('should show error toast on failed cancellation', () => {
			component.subscriptionToCancel = MOCK_SUBSCRIPTIONS[0];
			subscriptionServiceSpy.cancelSubscription.and.returnValue(throwError(() => new Error('Error de prueba')));

			component.confirmCancelSubscription();

			expect(toastServiceSpy.error).toHaveBeenCalled();
		});

		it('should close modal after cancellation', () => {
			component.subscriptionToCancel = MOCK_SUBSCRIPTIONS[0];
			component.isConfirmModalOpen = true;
			subscriptionServiceSpy.cancelSubscription.and.returnValue(of({ success: true, message: 'OK' }));

			component.confirmCancelSubscription();

			expect(component.isConfirmModalOpen).toBeFalse();
		});
	});
});
