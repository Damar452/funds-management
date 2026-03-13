import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ButtonVariant, ButtonSize } from '@core/models';

/**
 * Directiva para aplicar estilos consistentes a botones.
 * Centraliza las clases de Tailwind para mantener un diseño uniforme.
 * 
 * @example
 * ```html
 * <button appButton>Primary (default)</button>
 * <button appButton="secondary" size="lg">Secondary Large</button>
 * <button appButton="outline" [fullWidth]="true">Full Width</button>
 * ```
 */
@Directive({
	selector: '[appButton]',
	standalone: true,
})
export class ButtonDirective implements OnInit {
	@Input() appButton: ButtonVariant | '' = 'primary';
	@Input() size: ButtonSize = 'md';
	@Input() fullWidth = false;

	private get variant(): ButtonVariant {
		return this.appButton || 'primary';
	}

	private readonly baseClasses = [
		'font-medium',
		'rounded-lg',
		'transition-all',
		'inline-flex',
		'items-center',
		'justify-center',
		'disabled:opacity-50',
		'disabled:cursor-not-allowed',
	];

	private readonly variantClasses: Record<ButtonVariant, string[]> = {
		primary: ['bg-primary', 'text-white', 'hover:opacity-90'],
		secondary: ['bg-secondary', 'text-white', 'hover:opacity-90'],
		outline: ['border', 'border-gray-200', 'text-text', 'hover:bg-gray-50'],
		danger: ['bg-red-500', 'text-white', 'hover:opacity-90'],
		warning: ['bg-yellow-500', 'text-white', 'hover:opacity-90'],
		info: ['bg-primary', 'text-white', 'hover:opacity-90'],
		ghost: ['text-text', 'hover:bg-gray-100'],
	};

	private readonly sizeClasses: Record<ButtonSize, string[]> = {
		sm: ['px-3', 'py-1.5', 'text-sm'],
		md: ['px-4', 'py-2.5', 'text-sm'],
		lg: ['px-6', 'py-3', 'text-base'],
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
			...this.variantClasses[this.variant],
			...this.sizeClasses[this.size],
		];

		if (this.fullWidth) {
			classes.push('w-full');
		}

		classes.forEach((cls) => {
			this.renderer.addClass(this.el.nativeElement, cls);
		});
	}
}
