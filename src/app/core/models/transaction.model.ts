import { NotificationMethod } from './subscription.model';

export enum TransactionType {
	SUBSCRIPTION = 'subscription',
	CANCELLATION = 'cancellation',
}

export interface Transaction {
	id: number;
	userId: number;
	fundId: number;
	subscriptionId: number;
	type: TransactionType;
	amount: number;
	balanceBefore: number;
	balanceAfter: number;
	notificationMethod: NotificationMethod;
	createdAt: string;
}

export interface CreateTransactionDto {
	userId: number;
	fundId: number;
	subscriptionId: number;
	type: TransactionType;
	amount: number;
	balanceBefore: number;
	balanceAfter: number;
	notificationMethod: NotificationMethod;
}
