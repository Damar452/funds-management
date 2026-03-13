import { Injectable, inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Fund } from '../../models';

/**
 * Servicio para gestionar los fondos de inversión disponibles.
 * Carga los fondos desde un archivo JSON y proporciona métodos
 * de búsqueda y consulta.
 */
@Injectable({
	providedIn: 'root',
})
export class FundService {
	private readonly http = inject(HttpClient);
	private readonly baseHref = inject(APP_BASE_HREF, { optional: true }) || '/';
	private readonly fundsSubject = new BehaviorSubject<Fund[]>([]);

	readonly funds$ = this.fundsSubject.asObservable();

	loadFunds(): Observable<Fund[]> {
		return this.http.get<Fund[]>(`${this.baseHref}data/funds.json`).pipe(
			tap((funds) => this.fundsSubject.next(funds))
		);
	}

	getFunds(): Fund[] {
		return this.fundsSubject.getValue();
	}

	getFundById(id: number): Fund | undefined {
		return this.fundsSubject.getValue().find((fund) => fund.id === id);
	}

	/**
	 * Busca fondos que coincidan con el término de búsqueda.
	 * La búsqueda es case-insensitive y busca en nombre, descripción y categoría.
	 * 
	 * @param term - Término de búsqueda
	 * @returns Array de fondos que coinciden con el término
	 */
	searchFunds(term: string): Fund[] {
		const funds = this.fundsSubject.getValue();
		if (!term.trim()) {
			return funds;
		}
		const lowerTerm = term.toLowerCase();
		return funds.filter(
			(fund) =>
				fund.name.toLowerCase().includes(lowerTerm) ||
				fund.description.toLowerCase().includes(lowerTerm) ||
				fund.category.toLowerCase().includes(lowerTerm)
		);
	}
}
