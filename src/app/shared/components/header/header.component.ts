import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, CurrencyPipe],
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	@Input() showLogin = true;
	@Input() userName: string | null = null;
	@Input() userEmail: string | null = null;
	@Input() userBalance: number | null = null;
	@Input() showMenuButton = false;
	@Output() menuClick = new EventEmitter<void>();

	get displayName(): string {
		return this.userName || this.userEmail || 'Usuario';
	}

	onMenuClick(): void {
		this.menuClick.emit();
	}
}
