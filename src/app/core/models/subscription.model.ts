export enum NotificationMethod {
	EMAIL = 'email',
	SMS = 'sms',
}

export const NOTIFICATION_METHOD_LABELS: Record<NotificationMethod, string> = {
	[NotificationMethod.EMAIL]: 'correo electrónico',
	[NotificationMethod.SMS]: 'SMS',
};

export enum SubscriptionStatus {
	ACTIVE = 'active',
	CANCELLED = 'cancelled',
}

export interface FundSubscription {
	id: number;
	userId: number;
	fundId: number;
	amount: number;
	notificationMethod: NotificationMethod;
	status: SubscriptionStatus;
	createdAt: string;
	updatedAt: string;
}

export interface SubscribeResult {
	success: boolean;
	message: string;
	subscription?: FundSubscription;
}
