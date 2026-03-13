import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonDirective } from './button.directive';

@Component({
	standalone: true,
	imports: [ButtonDirective],
	template: `<button appButton>Test</button>`,
})
class TestHostComponent {}

@Component({
	standalone: true,
	imports: [ButtonDirective],
	template: `<button appButton="secondary" size="lg" [fullWidth]="true">Test</button>`,
})
class TestHostWithOptionsComponent {}

describe('ButtonDirective', () => {
	describe('default options', () => {
		let fixture: ComponentFixture<TestHostComponent>;
		let buttonEl: HTMLElement;

		beforeEach(async () => {
			await TestBed.configureTestingModule({
				imports: [TestHostComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(TestHostComponent);
			fixture.detectChanges();
			buttonEl = fixture.nativeElement.querySelector('button');
		});

		it('should apply base classes', () => {
			expect(buttonEl.classList.contains('font-medium')).toBeTrue();
			expect(buttonEl.classList.contains('rounded-lg')).toBeTrue();
			expect(buttonEl.classList.contains('transition-all')).toBeTrue();
		});

		it('should apply primary variant by default', () => {
			expect(buttonEl.classList.contains('bg-primary')).toBeTrue();
			expect(buttonEl.classList.contains('text-white')).toBeTrue();
		});

		it('should apply md size by default', () => {
			expect(buttonEl.classList.contains('px-4')).toBeTrue();
			expect(buttonEl.classList.contains('py-2.5')).toBeTrue();
		});
	});

	describe('with options', () => {
		let fixture: ComponentFixture<TestHostWithOptionsComponent>;
		let buttonEl: HTMLElement;

		beforeEach(async () => {
			await TestBed.configureTestingModule({
				imports: [TestHostWithOptionsComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(TestHostWithOptionsComponent);
			fixture.detectChanges();
			buttonEl = fixture.nativeElement.querySelector('button');
		});

		it('should apply secondary variant', () => {
			expect(buttonEl.classList.contains('bg-secondary')).toBeTrue();
		});

		it('should apply lg size', () => {
			expect(buttonEl.classList.contains('px-6')).toBeTrue();
			expect(buttonEl.classList.contains('py-3')).toBeTrue();
		});

		it('should apply full width', () => {
			expect(buttonEl.classList.contains('w-full')).toBeTrue();
		});
	});
});
