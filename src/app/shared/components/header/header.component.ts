import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	@Input() showLogin = true;
	@Input() userName: string | null = null;
	@Input() userEmail: string | null = null;

	get displayName(): string {
		return this.userName || this.userEmail || 'Usuario';
	}
}
