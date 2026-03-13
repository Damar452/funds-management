import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FundService } from './fund.service';
import { MOCK_FUNDS } from '@testing';

describe('FundService', () => {
	let service: FundService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(),
				FundService,
			],
		});
		service = TestBed.inject(FundService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('loadFunds', () => {
		it('should load funds from API', () => {
			service.loadFunds().subscribe((funds) => {
				expect(funds).toEqual(MOCK_FUNDS);
			});

			const req = httpMock.expectOne('/data/funds.json');
			expect(req.request.method).toBe('GET');
			req.flush(MOCK_FUNDS);
		});
	});

	describe('getFundById', () => {
		it('should return fund when id exists', () => {
			service.loadFunds().subscribe();
			const req = httpMock.expectOne('/data/funds.json');
			req.flush(MOCK_FUNDS);

			const fund = service.getFundById(1);
			expect(fund).toBeDefined();
			expect(fund?.name).toBe('FPV_BTG_PACTUAL_RECAUDADORA');
		});

		it('should return undefined when id does not exist', () => {
			service.loadFunds().subscribe();
			const req = httpMock.expectOne('/data/funds.json');
			req.flush(MOCK_FUNDS);

			const fund = service.getFundById(999);
			expect(fund).toBeUndefined();
		});
	});

	describe('searchFunds', () => {
		it('should find funds by name', () => {
			service.loadFunds().subscribe();
			const req = httpMock.expectOne('/data/funds.json');
			req.flush(MOCK_FUNDS);

			const results = service.searchFunds('ECOPETROL');
			expect(results.length).toBe(1);
			expect(results[0].name).toBe('FPV_BTG_PACTUAL_ECOPETROL');
		});

		it('should find funds by category', () => {
			service.loadFunds().subscribe();
			const req = httpMock.expectOne('/data/funds.json');
			req.flush(MOCK_FUNDS);

			const results = service.searchFunds('FIC');
			expect(results.length).toBe(1);
			expect(results[0].name).toBe('DEUDAPRIVADA');
		});

		it('should be case insensitive', () => {
			service.loadFunds().subscribe();
			const req = httpMock.expectOne('/data/funds.json');
			req.flush(MOCK_FUNDS);

			const results = service.searchFunds('fpv');
			expect(results.length).toBeGreaterThan(0);
		});

		it('should return empty array when no matches', () => {
			service.loadFunds().subscribe();
			const req = httpMock.expectOne('/data/funds.json');
			req.flush(MOCK_FUNDS);

			const results = service.searchFunds('xyz123');
			expect(results.length).toBe(0);
		});
	});
});
