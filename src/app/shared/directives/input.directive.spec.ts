import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDirective } from './input.directive';

@Component({
	standalone: true,
	imports: [InputDirective],
	template: `<input appInput />`,
})
class TestHostComponent {}

@Component({
	standalone: true,
	imports: [InputDirective],
	template: `<input appInput inputSize="lg" />`,
})
class TestHostWithSizeComponent {}

describe('InputDirective', () => {
	describe('default options', () => {
		let fixture: ComponentFixture<TestHostComponent>;
		let inputEl: HTMLElement;

		beforeEach(async () => {
			await TestBed.configureTestingModule({
				imports: [TestHostComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(TestHostComponent);
			fixture.detectChanges();
			inputEl = fixture.nativeElement.querySelector('input');
		});

		it('should apply base classes', () => {
			expect(inputEl.classList.contains('w-full')).toBeTrue();
			expect(inputEl.classList.contains('border')).toBeTrue();
			expect(inputEl.classList.contains('rounded-lg')).toBeTrue();
			expect(inputEl.classList.contains('transition-colors')).toBeTrue();
		});

		it('should apply border color', () => {
			expect(inputEl.classList.contains('border-gray-200')).toBeTrue();
		});

		it('should apply invalid state classes', () => {
			expect(inputEl.classList.contains('invalid:border-red-500')).toBeTrue();
		});

		it('should apply md size by default', () => {
			expect(inputEl.classList.contains('px-4')).toBeTrue();
			expect(inputEl.classList.contains('py-3')).toBeTrue();
		});
	});

	describe('with size option', () => {
		let fixture: ComponentFixture<TestHostWithSizeComponent>;
		let inputEl: HTMLElement;

		beforeEach(async () => {
			await TestBed.configureTestingModule({
				imports: [TestHostWithSizeComponent],
			}).compileComponents();

			fixture = TestBed.createComponent(TestHostWithSizeComponent);
			fixture.detectChanges();
			inputEl = fixture.nativeElement.querySelector('input');
		});

		it('should apply lg size', () => {
			expect(inputEl.classList.contains('py-3.5')).toBeTrue();
		});
	});
});
