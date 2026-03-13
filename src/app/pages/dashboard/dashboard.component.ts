import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, SidebarComponent } from '@shared';
import { UserService, FundService } from '@core';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [HeaderComponent, SidebarComponent, AsyncPipe, RouterOutlet],
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
	private readonly userService = inject(UserService);
	private readonly fundService = inject(FundService);
	readonly user$ = this.userService.user$;

	ngOnInit(): void {
		this.loadInitialData();
	}

	private loadInitialData(): void {
		this.userService.loadUser().subscribe();
		this.fundService.loadFunds().subscribe();
	}
}
