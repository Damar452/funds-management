import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

export type InputSize = 'sm' | 'md' | 'lg';

@Directive({
	selector: '[appInput]',
	standalone: true,
})
export class InputDirective implements OnInit {
	@Input() appInput: '' = '';
	@Input() inputSize: InputSize = 'md';

	private readonly baseClasses = [
		'w-full',
		'border',
		'border-gray-200',
		'rounded-lg',
		'text-text',
		'transition-colors',
		'focus:outline-none',
		'focus:ring-2',
		'focus:ring-primary/20',
		'focus:border-primary',
		'placeholder:text-text-secondary',
		'invalid:border-red-500',
		'invalid:focus:ring-red-200',
		'invalid:focus:border-red-500',
	];

	private readonly sizeClasses: Record<InputSize, string[]> = {
		sm: ['px-3', 'py-2', 'text-sm'],
		md: ['px-4', 'py-3', 'text-sm'],
		lg: ['px-4', 'py-3.5', 'text-base'],
	};

	constructor(
		private readonly el: ElementRef<HTMLElement>,
		private readonly renderer: Renderer2
	) {}

	ngOnInit(): void {
		this.applyClasses();
	}

	private applyClasses(): void {
		const classes = [
			...this.baseClasses,
			...this.sizeClasses[this.inputSize],
		];

		classes.forEach((cls) => {
			this.renderer.addClass(this.el.nativeElement, cls);
		});
	}
}
