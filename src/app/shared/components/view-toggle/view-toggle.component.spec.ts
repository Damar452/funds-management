import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewToggleComponent } from './view-toggle.component';
import { ViewMode } from '@core/models';

describe('ViewToggleComponent', () => {
	let component: ViewToggleComponent;
	let fixture: ComponentFixture<ViewToggleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ViewToggleComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ViewToggleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('inputs', () => {
		it('should have default currentView as CARDS', () => {
			expect(component.currentView).toBe(ViewMode.CARDS);
		});
	});

	describe('setView', () => {
		it('should emit viewChange with CARDS', () => {
			spyOn(component.viewChange, 'emit');
			component.setView(ViewMode.CARDS);
			expect(component.viewChange.emit).toHaveBeenCalledWith(ViewMode.CARDS);
		});

		it('should emit viewChange with TABLE', () => {
			spyOn(component.viewChange, 'emit');
			component.setView(ViewMode.TABLE);
			expect(component.viewChange.emit).toHaveBeenCalledWith(ViewMode.TABLE);
		});
	});
});
