import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserService, FundService } from '@core';
import { MOCK_USER } from '@testing';
import { BehaviorSubject, of } from 'rxjs';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;
	let userServiceSpy: jasmine.SpyObj<UserService>;
	let fundServiceSpy: jasmine.SpyObj<FundService>;
	let userSubject: BehaviorSubject<any>;

	beforeEach(async () => {
		userSubject = new BehaviorSubject<any>(MOCK_USER);

		userServiceSpy = jasmine.createSpyObj('UserService', ['loadUser'], {
			user$: userSubject.asObservable(),
		});
		userServiceSpy.loadUser.and.returnValue(of(MOCK_USER));

		fundServiceSpy = jasmine.createSpyObj('FundService', ['loadFunds']);
		fundServiceSpy.loadFunds.and.returnValue(of([]));

		await TestBed.configureTestingModule({
			imports: [DashboardComponent],
			providers: [
				provideRouter([]),
				{ provide: UserService, useValue: userServiceSpy },
				{ provide: FundService, useValue: fundServiceSpy },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('ngOnInit', () => {
		it('should load user data', () => {
			expect(userServiceSpy.loadUser).toHaveBeenCalled();
		});

		it('should load funds data', () => {
			expect(fundServiceSpy.loadFunds).toHaveBeenCalled();
		});
	});

	describe('sidebar', () => {
		it('should have sidebar closed initially', () => {
			expect(component.isSidebarOpen).toBeFalse();
		});

		it('should toggle sidebar state', () => {
			component.toggleSidebar();
			expect(component.isSidebarOpen).toBeTrue();

			component.toggleSidebar();
			expect(component.isSidebarOpen).toBeFalse();
		});

		it('should close sidebar', () => {
			component.isSidebarOpen = true;
			component.closeSidebar();
			expect(component.isSidebarOpen).toBeFalse();
		});
	});
});
