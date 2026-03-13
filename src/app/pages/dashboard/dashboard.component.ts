import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from '@shared';
import { UserService } from '@core';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [HeaderComponent, AsyncPipe],
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
	private readonly userService = inject(UserService);
	readonly user$ = this.userService.user$;

	ngOnInit(): void {
		this.loadUser();
	}

	loadUser() {
		this.userService.loadUser().subscribe();
	}
}
