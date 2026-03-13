import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction, CreateTransactionDto } from '../models';

@Injectable({
	providedIn: 'root',
})
export class TransactionService {
	private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
	private nextId = 1;

	readonly transactions$ = this.transactionsSubject.asObservable();

	getTransactions(): Transaction[] {
		return this.transactionsSubject.getValue();
	}

	getTransactionsByUserId(userId: number): Transaction[] {
		return this.transactionsSubject
			.getValue()
			.filter((transaction) => transaction.userId === userId)
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
	}

	addTransaction(dto: CreateTransactionDto): Transaction {
		const transaction: Transaction = {
			id: this.nextId++,
			...dto,
			createdAt: new Date().toISOString(),
		};

		const transactions = this.transactionsSubject.getValue();
		this.transactionsSubject.next([...transactions, transaction]);

		return transaction;
	}
}
