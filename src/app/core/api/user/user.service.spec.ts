import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { MOCK_USER } from '@testing';

describe('UserService', () => {
	let service: UserService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(),
				provideHttpClientTesting(),
				UserService,
			],
		});
		service = TestBed.inject(UserService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('loadUser', () => {
		it('should load user from API', () => {
			service.loadUser().subscribe((user) => {
				expect(user).toEqual(MOCK_USER);
			});

			const req = httpMock.expectOne('data/user.json');
			expect(req.request.method).toBe('GET');
			req.flush(MOCK_USER);
		});

		it('should update user$ observable after loading', () => {
			service.loadUser().subscribe();

			const req = httpMock.expectOne('data/user.json');
			req.flush(MOCK_USER);

			service.user$.subscribe((user) => {
				expect(user).toEqual(MOCK_USER);
			});
		});
	});

	describe('getUser', () => {
		it('should return null when no user is loaded', () => {
			expect(service.getUser()).toBeNull();
		});

		it('should return user after loading', () => {
			service.loadUser().subscribe();
			const req = httpMock.expectOne('data/user.json');
			req.flush(MOCK_USER);

			expect(service.getUser()).toEqual(MOCK_USER);
		});
	});

	describe('updateBalance', () => {
		it('should update user balance', () => {
			service.loadUser().subscribe();
			const req = httpMock.expectOne('data/user.json');
			req.flush(MOCK_USER);

			service.updateBalance(600000);

			const user = service.getUser();
			expect(user?.balance).toBe(600000);
		});

		it('should not update if no user exists', () => {
			service.updateBalance(600000);
			expect(service.getUser()).toBeNull();
		});
	});
});
