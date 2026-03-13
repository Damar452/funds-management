import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Fund } from '../../models';

@Injectable({
	providedIn: 'root',
})
export class FundService {
	private readonly http = inject(HttpClient);
	private readonly fundsSubject = new BehaviorSubject<Fund[]>([]);

	readonly funds$ = this.fundsSubject.asObservable();

	loadFunds(): Observable<Fund[]> {
		return this.http.get<Fund[]>('/data/funds.json').pipe(
			tap((funds) => this.fundsSubject.next(funds))
		);
	}

	getFunds(): Fund[] {
		return this.fundsSubject.getValue();
	}

	getFundById(id: number): Fund | undefined {
		return this.fundsSubject.getValue().find((fund) => fund.id === id);
	}

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
