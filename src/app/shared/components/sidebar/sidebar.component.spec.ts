import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SidebarComponent],
			providers: [provideRouter([])],
		}).compileComponents();

		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('navItems', () => {
		it('should have 3 navigation items', () => {
			expect(component.navItems.length).toBe(3);
		});

		it('should have correct routes', () => {
			const routes = component.navItems.map((item) => item.route);
			expect(routes).toContain('/dashboard/funds');
			expect(routes).toContain('/dashboard/subscriptions');
			expect(routes).toContain('/dashboard/transactions');
		});
	});

	describe('close event', () => {
		it('should emit close when onClose is called', () => {
			spyOn(component.close, 'emit');
			component.onClose();
			expect(component.close.emit).toHaveBeenCalled();
		});

		it('should emit close when onNavClick is called', () => {
			spyOn(component.close, 'emit');
			component.onNavClick();
			expect(component.close.emit).toHaveBeenCalled();
		});
	});

	describe('inputs', () => {
		it('should have default isOpen as false', () => {
			expect(component.isOpen).toBeFalse();
		});
	});
});
