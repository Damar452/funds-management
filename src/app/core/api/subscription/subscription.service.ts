import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FundSubscription, NotificationMethod, SubscribeResult, SubscriptionStatus, TransactionType } from '../../models';
import { MESSAGES } from '../../constants';
import { UserService } from '../user/user.service';
import { TransactionService } from '../transaction/transaction.service';

/**
 * Servicio para gestionar las suscripciones a fondos de inversión.
 * Maneja la creación, cancelación y consulta de suscripciones,
 * coordinando con UserService y TransactionService para mantener
 * la consistencia del balance y el historial de transacciones.
 */
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

	/**
	 * Crea una nueva suscripción a un fondo de inversión.
	 * 
	 * Proceso:
	 * 1. Valida que el usuario exista y tenga saldo suficiente
	 * 2. Verifica que no exista una suscripción activa al mismo fondo
	 * 3. Descuenta el monto del balance del usuario
	 * 4. Crea la suscripción y registra la transacción
	 * 
	 * @param fundId - ID del fondo al que se desea suscribir
	 * @param amount - Monto a invertir (debe ser >= monto mínimo del fondo)
	 * @param notificationMethod - Método de notificación preferido (EMAIL o SMS)
	 * @returns Observable con el resultado de la operación
	 * 
	 * @example
	 * ```typescript
	 * subscriptionService.subscribe(1, 75000, NotificationMethod.EMAIL)
	 *   .subscribe(result => {
	 *     if (result.success) {
	 *       console.log('Suscripción creada:', result.subscription);
	 *     }
	 *   });
	 * ```
	 */
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

	/**
	 * Cancela una suscripción activa y reintegra el monto al balance del usuario.
	 * 
	 * Proceso:
	 * 1. Valida que el usuario y la suscripción existan
	 * 2. Verifica que la suscripción no esté ya cancelada
	 * 3. Reintegra el monto al balance del usuario
	 * 4. Actualiza el estado de la suscripción y registra la transacción
	 * 
	 * @param subscriptionId - ID de la suscripción a cancelar
	 * @returns Observable con el resultado de la operación
	 * 
	 * @example
	 * ```typescript
	 * subscriptionService.cancelSubscription(1)
	 *   .subscribe(result => {
	 *     if (result.success) {
	 *       console.log('Suscripción cancelada');
	 *     }
	 *   });
	 * ```
	 */
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
