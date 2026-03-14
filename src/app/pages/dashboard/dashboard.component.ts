import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeaderComponent, SidebarComponent } from '@shared';
import { UserService, FundService } from '@core';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [HeaderComponent, SidebarComponent, AsyncPipe, RouterOutlet],
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
	private readonly userService = inject(UserService);
	private readonly fundService = inject(FundService);
	private readonly destroy$ = new Subject<void>();
	readonly user$ = this.userService.user$;

	isSidebarOpen = false;

	ngOnInit(): void {
		this.loadInitialData();
	}

	private loadInitialData(): void {
		this.userService.loadUser().pipe(takeUntil(this.destroy$)).subscribe();
		this.fundService.loadFunds().pipe(takeUntil(this.destroy$)).subscribe();
	}

	toggleSidebar(): void {
		this.isSidebarOpen = !this.isSidebarOpen;
	}

	closeSidebar(): void {
		this.isSidebarOpen = false;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
