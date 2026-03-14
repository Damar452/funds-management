import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models';

/**
 * Servicio para gestionar la información del usuario autenticado.
 * Mantiene el estado del usuario y su balance actualizado.
 */
@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly http = inject(HttpClient);
	private readonly userSubject = new BehaviorSubject<User | null>(null);

	readonly user$ = this.userSubject.asObservable();

	loadUser(): Observable<User> {
		return this.http.get<User>('./assets/data/user.json').pipe(
			tap((user) => this.userSubject.next(user))
		);
	}

	getUser(): User | null {
		return this.userSubject.getValue();
	}

	/**
	 * Actualiza el balance del usuario.
	 * Se utiliza al suscribirse o cancelar suscripciones a fondos.
	 * 
	 * @param newBalance - Nuevo balance a establecer
	 */
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
