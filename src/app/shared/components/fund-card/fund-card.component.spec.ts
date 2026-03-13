import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundCardComponent } from './fund-card.component';
import { MOCK_FUNDS } from '@testing';

describe('FundCardComponent', () => {
	let component: FundCardComponent;
	let fixture: ComponentFixture<FundCardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FundCardComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FundCardComponent);
		component = fixture.componentInstance;
		component.fund = MOCK_FUNDS[0];
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('inputs', () => {
		it('should have default isSubscribed as false', () => {
			expect(component.isSubscribed).toBeFalse();
		});

		it('should accept fund input', () => {
			expect(component.fund).toEqual(MOCK_FUNDS[0]);
		});
	});

	describe('subscribe event', () => {
		it('should emit fund when onSubscribe is called', () => {
			spyOn(component.subscribe, 'emit');
			component.onSubscribe();
			expect(component.subscribe.emit).toHaveBeenCalledWith(MOCK_FUNDS[0]);
		});
	});
});
