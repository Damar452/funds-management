import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsComponent } from './transactions.component';
import { TransactionService, FundService } from '@core';
import { ViewMode, TransactionType, NotificationMethod } from '@core/models';
import { MOCK_FUNDS } from '@testing';
import { BehaviorSubject } from 'rxjs';

describe('TransactionsComponent', () => {
	let component: TransactionsComponent;
	let fixture: ComponentFixture<TransactionsComponent>;
	let transactionServiceSpy: jasmine.SpyObj<TransactionService>;
	let fundServiceSpy: jasmine.SpyObj<FundService>;
	let transactionsSubject: BehaviorSubject<any[]>;

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
		transactionsSubject = new BehaviorSubject<any[]>(mockTransactions);

		transactionServiceSpy = jasmine.createSpyObj('TransactionService', [], {
			transactions$: transactionsSubject.asObservable(),
		});

		fundServiceSpy = jasmine.createSpyObj('FundService', ['getFundById']);
		fundServiceSpy.getFundById.and.callFake((id: number) => MOCK_FUNDS.find((f) => f.id === id));

		await TestBed.configureTestingModule({
			imports: [TransactionsComponent],
			providers: [
				{ provide: TransactionService, useValue: transactionServiceSpy },
				{ provide: FundService, useValue: fundServiceSpy },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(TransactionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('initial state', () => {
		it('should have default viewMode as TIMELINE', () => {
			expect(component.viewMode).toBe(ViewMode.TIMELINE);
		});

		it('should have empty searchTerm', () => {
			expect(component.searchTerm).toBe('');
		});

		it('should have columns defined', () => {
			expect(component.columns.length).toBeGreaterThan(0);
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

	describe('getFilteredTransactions', () => {
		it('should return all transactions when no search term', () => {
			component.searchTerm = '';
			const result = component.getFilteredTransactions(mockTransactions);
			expect(result.length).toBe(mockTransactions.length);
		});

		it('should filter by fund name', () => {
			component.searchTerm = 'RECAUDADORA';
			const result = component.getFilteredTransactions(mockTransactions);
			expect(result.length).toBeGreaterThan(0);
		});

		it('should filter by transaction type', () => {
			component.searchTerm = 'suscripción';
			const result = component.getFilteredTransactions(mockTransactions);
			expect(result.every((t) => t.type === TransactionType.SUBSCRIPTION)).toBeTrue();
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
			component.onViewChange(ViewMode.CARDS);
			expect(component.viewMode).toBe(ViewMode.CARDS);
		});
	});
});
