import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FundSubscription, NotificationMethod, SubscribeResult, SubscriptionStatus, TransactionType } from '../../models';
import { MESSAGES } from '../../constants';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';

@Injectable({
	providedIn: 'root',
})
export class SubscriptionService {
	private readonly userService = inject(UserService);
	private readonly transactionService = inject(TransactionService);
	private readonly subscriptionsSubject = new BehaviorSubject<FundSubscription[]>([]);
	private nextId = 1;

	readonly subscriptions$ = this.subscriptionsSubject.asObservable();

	getSubscriptions(): FundSubscription[] {
		return this.subscriptionsSubject.getValue();
	}

	getActiveSubscriptions(): FundSubscription[] {
		return this.subscriptionsSubject.getValue().filter((sub) => sub.status === SubscriptionStatus.ACTIVE);
	}

	getSubscriptionByFundId(fundId: number): FundSubscription | undefined {
		return this.subscriptionsSubject
			.getValue()
			.find((sub) => sub.fundId === fundId && sub.status === SubscriptionStatus.ACTIVE);
	}

	subscribe(
		fundId: number,
		amount: number,
		notificationMethod: NotificationMethod
	): Observable<SubscribeResult> {
		const user = this.userService.getUser();

		if (!user) {
			return of({ success: false, message: MESSAGES.ERROR.USER_NOT_FOUND });
		}

		if (user.balance < amount) {
			return of({
				success: false,
				message: MESSAGES.ERROR.INSUFFICIENT_BALANCE(user.balance),
			});
		}

		const existingSubscription = this.getSubscriptionByFundId(fundId);
		if (existingSubscription) {
			return of({
				success: false,
				message: MESSAGES.ERROR.SUBSCRIPTION_ALREADY_EXISTS,
			});
		}

		const now = new Date().toISOString();
		const newSubscription: FundSubscription = {
			id: this.nextId++,
			userId: user.id,
			fundId,
			amount,
			notificationMethod,
			status: SubscriptionStatus.ACTIVE,
			createdAt: now,
			updatedAt: now,
		};

		const balanceBefore = user.balance;
		const balanceAfter = balanceBefore - amount;

		this.userService.updateBalance(balanceAfter);

		const subscriptions = this.subscriptionsSubject.getValue();
		this.subscriptionsSubject.next([...subscriptions, newSubscription]);

		this.transactionService.addTransaction({
			userId: user.id,
			fundId,
			subscriptionId: newSubscription.id,
			type: TransactionType.SUBSCRIPTION,
			amount,
			balanceBefore,
			balanceAfter,
			notificationMethod,
		});

		return of({
			success: true,
			message: MESSAGES.SUCCESS.SUBSCRIPTION_CREATED(notificationMethod),
			subscription: newSubscription,
		});
	}

	cancelSubscription(subscriptionId: number): Observable<SubscribeResult> {
		const user = this.userService.getUser();
		const subscriptions = this.subscriptionsSubject.getValue();
		const subscription = subscriptions.find((sub) => sub.id === subscriptionId);

		if (!user) {
			return of({ success: false, message: MESSAGES.ERROR.USER_NOT_FOUND });
		}

		if (!subscription) {
			return of({ success: false, message: MESSAGES.ERROR.SUBSCRIPTION_NOT_FOUND });
		}

		if (subscription.status === SubscriptionStatus.CANCELLED) {
			return of({ success: false, message: MESSAGES.ERROR.SUBSCRIPTION_ALREADY_CANCELLED });
		}

		const now = new Date().toISOString();
		const balanceBefore = user.balance;
		const balanceAfter = balanceBefore + subscription.amount;

		this.userService.updateBalance(balanceAfter);

		const updatedSubscriptions = subscriptions.map((sub) =>
			sub.id === subscriptionId
				? { ...sub, status: SubscriptionStatus.CANCELLED, updatedAt: now }
				: sub
		);
		this.subscriptionsSubject.next(updatedSubscriptions);

		this.transactionService.addTransaction({
			userId: user.id,
			fundId: subscription.fundId,
			subscriptionId: subscription.id,
			type: TransactionType.CANCELLATION,
			amount: subscription.amount,
			balanceBefore,
			balanceAfter,
			notificationMethod: subscription.notificationMethod,
		});

		return of({
			success: true,
			message: MESSAGES.SUCCESS.SUBSCRIPTION_CANCELLED(subscription.amount),
		});
	}
}
