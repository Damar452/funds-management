import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundsListComponent } from './funds-list.component';
import { FundService, SubscriptionService, ToastService } from '@core';
import { ViewMode, NotificationMethod } from '@core/models';
import { MOCK_FUNDS } from '@testing';
import { BehaviorSubject, of } from 'rxjs';

describe('FundsListComponent', () => {
	let component: FundsListComponent;
	let fixture: ComponentFixture<FundsListComponent>;
	let fundServiceSpy: jasmine.SpyObj<FundService>;
	let subscriptionServiceSpy: jasmine.SpyObj<SubscriptionService>;
	let toastServiceSpy: jasmine.SpyObj<ToastService>;
	let fundsSubject: BehaviorSubject<any[]>;
	let subscriptionsSubject: BehaviorSubject<any[]>;

	beforeEach(async () => {
		fundsSubject = new BehaviorSubject<any[]>(MOCK_FUNDS);
		subscriptionsSubject = new BehaviorSubject<any[]>([]);

		fundServiceSpy = jasmine.createSpyObj('FundService', ['searchFunds'], {
			funds$: fundsSubject.asObservable(),
		});
		fundServiceSpy.searchFunds.and.returnValue([]);

		subscriptionServiceSpy = jasmine.createSpyObj(
			'SubscriptionService',
			['getSubscriptionByFundId', 'getActiveSubscriptions', 'subscribe'],
			{ subscriptions$: subscriptionsSubject.asObservable() }
		);
		subscriptionServiceSpy.getSubscriptionByFundId.and.returnValue(undefined);
		subscriptionServiceSpy.getActiveSubscriptions.and.returnValue([]);

		toastServiceSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);

		await TestBed.configureTestingModule({
			imports: [FundsListComponent],
			providers: [
				{ provide: FundService, useValue: fundServiceSpy },
				{ provide: SubscriptionService, useValue: subscriptionServiceSpy },
				{ provide: ToastService, useValue: toastServiceSpy },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FundsListComponent);
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

		it('should have modal closed initially', () => {
			expect(component.isModalOpen).toBeFalse();
			expect(component.selectedFund).toBeNull();
		});
	});

	describe('isSubscribed', () => {
		it('should return false when not subscribed', () => {
			subscriptionServiceSpy.getSubscriptionByFundId.and.returnValue(undefined);
			expect(component.isSubscribed(1)).toBeFalse();
		});

		it('should return true when subscribed', () => {
			subscriptionServiceSpy.getSubscriptionByFundId.and.returnValue({ id: 1 } as any);
			expect(component.isSubscribed(1)).toBeTrue();
		});
	});

	describe('onSubscribe', () => {
		it('should open modal with selected fund', () => {
			component.onSubscribe(MOCK_FUNDS[0]);
			expect(component.isModalOpen).toBeTrue();
			expect(component.selectedFund).toEqual(MOCK_FUNDS[0]);
		});
	});

	describe('onCloseModal', () => {
		it('should close modal and clear selected fund', () => {
			component.isModalOpen = true;
			component.selectedFund = MOCK_FUNDS[0];

			component.onCloseModal();

			expect(component.isModalOpen).toBeFalse();
			expect(component.selectedFund).toBeNull();
		});
	});

	describe('onConfirmSubscription', () => {
		it('should show success toast on successful subscription', () => {
			subscriptionServiceSpy.subscribe.and.returnValue(of({ success: true, message: 'OK' }));

			component.onConfirmSubscription({
				fund: MOCK_FUNDS[0],
				amount: 75000,
				notificationMethod: NotificationMethod.EMAIL,
			});

			expect(toastServiceSpy.success).toHaveBeenCalled();
		});

		it('should show error toast on failed subscription', () => {
			subscriptionServiceSpy.subscribe.and.returnValue(of({ success: false, message: 'Error' }));

			component.onConfirmSubscription({
				fund: MOCK_FUNDS[0],
				amount: 75000,
				notificationMethod: NotificationMethod.EMAIL,
			});

			expect(toastServiceSpy.error).toHaveBeenCalled();
		});

		it('should close modal after subscription', () => {
			subscriptionServiceSpy.subscribe.and.returnValue(of({ success: true, message: 'OK' }));
			component.isModalOpen = true;

			component.onConfirmSubscription({
				fund: MOCK_FUNDS[0],
				amount: 75000,
				notificationMethod: NotificationMethod.EMAIL,
			});

			expect(component.isModalOpen).toBeFalse();
		});
	});

	describe('onViewChange', () => {
		it('should update viewMode', () => {
			component.onViewChange(ViewMode.TABLE);
			expect(component.viewMode).toBe(ViewMode.TABLE);
		});
	});

	describe('onSearch', () => {
		it('should update searchTerm and call searchFunds', () => {
			fundServiceSpy.searchFunds.and.returnValue([MOCK_FUNDS[0]]);

			component.onSearch('FPV');

			expect(component.searchTerm).toBe('FPV');
			expect(fundServiceSpy.searchFunds).toHaveBeenCalledWith('FPV');
		});
	});

	describe('getFundsToDisplay', () => {
		it('should return all funds when no search term', () => {
			component.searchTerm = '';
			const result = component.getFundsToDisplay(MOCK_FUNDS);
			expect(result).toEqual(MOCK_FUNDS);
		});

		it('should return filtered funds when search term exists', () => {
			component.searchTerm = 'FPV';
			component.filteredFunds = [MOCK_FUNDS[0]];
			const result = component.getFundsToDisplay(MOCK_FUNDS);
			expect(result).toEqual([MOCK_FUNDS[0]]);
		});
	});
});
