import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly http = inject(HttpClient);
	private readonly userSubject = new BehaviorSubject<User | null>(null);

	readonly user$ = this.userSubject.asObservable();

	loadUser(): Observable<User> {
		return this.http.get<User>('/data/user.json').pipe(
			tap((user) => this.userSubject.next(user))
		);
	}

	getUser(): User | null {
		return this.userSubject.getValue();
	}

	updateBalance(newBalance: number): void {
		const user = this.userSubject.getValue();
		if (user) {
			this.userSubject.next({
				...user,
				balance: newBalance,
				updatedAt: new Date().toISOString(),
			});
		}
	}
}
