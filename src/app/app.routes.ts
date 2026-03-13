import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('@pages/landing/landing.component').then((m) => m.LandingComponent),
	},
	{
		path: 'dashboard',
		loadComponent: () =>
			import('@pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
		children: [
			{
				path: '',
				redirectTo: 'funds',
				pathMatch: 'full',
			},
			{
				path: 'funds',
				loadComponent: () =>
					import('@pages/dashboard/funds-list/funds-list.component').then((m) => m.FundsListComponent),
			},
			{
				path: 'subscriptions',
				loadComponent: () =>
					import('@pages/dashboard/subscriptions/subscriptions.component').then((m) => m.SubscriptionsComponent),
			},
			{
				path: 'transactions',
				loadComponent: () =>
					import('@pages/dashboard/transactions/transactions.component').then((m) => m.TransactionsComponent),
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];
