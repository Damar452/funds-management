import { TestBed } from '@angular/core/testing';
import { SubscriptionService } from './subscription.service';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';
import { NotificationMethod, SubscriptionStatus } from '../../models';
import { MOCK_USER } from '@testing';

describe('SubscriptionService', () => {
	let service: SubscriptionService;
	let userServiceSpy: jasmine.SpyObj<UserService>;
	let transactionServiceSpy: jasmine.SpyObj<TransactionService>;

	beforeEach(() => {
		const userSpy = jasmine.createSpyObj('UserService', ['getUser', 'updateBalance']);
		const transactionSpy = jasmine.createSpyObj('TransactionService', ['addTransaction']);

		TestBed.configureTestingModule({
			providers: [
				SubscriptionService,
				{ provide: UserService, useValue: userSpy },
				{ provide: TransactionService, useValue: transactionSpy },
			],
		});

		service = TestBed.inject(SubscriptionService);
		userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
		transactionServiceSpy = TestBed.inject(TransactionService) as jasmine.SpyObj<TransactionService>;
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getActiveSubscriptions', () => {
		it('should return empty array initially', () => {
			const active = service.getActiveSubscriptions();
			expect(active.length).toBe(0);
		});
	});

	describe('subscribe', () => {
		it('should throw error if user is not found', (done) => {
			userServiceSpy.getUser.and.returnValue(null);

			service.subscribe(1, 75000, NotificationMethod.EMAIL).subscribe({
				next: () => fail('should have thrown error'),
				error: (error) => {
					expect(error).toBeInstanceOf(Error);
					expect(error.message).toBeDefined();
					done();
				},
			});
		});

		it('should throw error if insufficient balance', (done) => {
			userServiceSpy.getUser.and.returnValue({ ...MOCK_USER, balance: 50000 });

			service.subscribe(1, 75000, NotificationMethod.EMAIL).subscribe({
				next: () => fail('should have thrown error'),
				error: (error) => {
					expect(error).toBeInstanceOf(Error);
					expect(error.message).toBeDefined();
					done();
				},
			});
		});

		it('should create a new subscription successfully', () => {
			userServiceSpy.getUser.and.returnValue(MOCK_USER);

			service.subscribe(1, 75000, NotificationMethod.EMAIL).subscribe((result) => {
				expect(result.success).toBeTrue();
				expect(result.subscription).toBeDefined();
				expect(result.subscription?.fundId).toBe(1);
				expect(result.subscription?.amount).toBe(75000);
				expect(result.subscription?.status).toBe(SubscriptionStatus.ACTIVE);
			});

			expect(userServiceSpy.updateBalance).toHaveBeenCalledWith(425000);
			expect(transactionServiceSpy.addTransaction).toHaveBeenCalled();
		});

		it('should throw error if already subscribed to fund', (done) => {
			userServiceSpy.getUser.and.returnValue(MOCK_USER);

			service.subscribe(1, 75000, NotificationMethod.EMAIL).subscribe();

			service.subscribe(1, 75000, NotificationMethod.EMAIL).subscribe({
				next: () => fail('should have thrown error'),
				error: (error) => {
					expect(error).toBeInstanceOf(Error);
					done();
				},
			});
		});
	});

	describe('cancelSubscription', () => {
		it('should throw error if user is not found', (done) => {
			userServiceSpy.getUser.and.returnValue(null);

			service.cancelSubscription(1).subscribe({
				next: () => fail('should have thrown error'),
				error: (error) => {
					expect(error).toBeInstanceOf(Error);
					done();
				},
			});
		});

		it('should throw error if subscription does not exist', (done) => {
			userServiceSpy.getUser.and.returnValue(MOCK_USER);

			service.cancelSubscription(999).subscribe({
				next: () => fail('should have thrown error'),
				error: (error) => {
					expect(error).toBeInstanceOf(Error);
					done();
				},
			});
		});

		it('should cancel an existing subscription', () => {
			userServiceSpy.getUser.and.returnValue(MOCK_USER);

			service.subscribe(1, 75000, NotificationMethod.EMAIL).subscribe();

			service.cancelSubscription(1).subscribe((result) => {
				expect(result.success).toBeTrue();
			});

			const active = service.getActiveSubscriptions();
			expect(active.length).toBe(0);
		});
	});
});
