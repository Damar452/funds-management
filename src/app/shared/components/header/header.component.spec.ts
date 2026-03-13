import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderComponent],
			providers: [provideRouter([])],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('displayName', () => {
		it('should return userName when available', () => {
			component.userName = 'John Doe';
			expect(component.displayName).toBe('John Doe');
		});

		it('should return userEmail when userName is not available', () => {
			component.userName = null;
			component.userEmail = 'john@example.com';
			expect(component.displayName).toBe('john@example.com');
		});

		it('should return "Usuario" when no name or email', () => {
			component.userName = null;
			component.userEmail = null;
			expect(component.displayName).toBe('Usuario');
		});
	});

	describe('menuClick', () => {
		it('should emit when onMenuClick is called', () => {
			spyOn(component.menuClick, 'emit');
			component.onMenuClick();
			expect(component.menuClick.emit).toHaveBeenCalled();
		});
	});

	describe('inputs', () => {
		it('should have default showLogin as true', () => {
			expect(component.showLogin).toBeTrue();
		});

		it('should have default showMenuButton as false', () => {
			expect(component.showMenuButton).toBeFalse();
		});
	});
});
