import { FundSubscription, NotificationMethod, SubscriptionStatus } from '@core/models';

export const MOCK_SUBSCRIPTIONS: FundSubscription[] = [
	{
		id: 1,
		userId: 1,
		fundId: 1,
		amount: 75000,
		notificationMethod: NotificationMethod.EMAIL,
		status: SubscriptionStatus.ACTIVE,
		createdAt: '2024-01-01',
		updatedAt: '2024-01-01',
	},
	{
		id: 2,
		userId: 1,
		fundId: 2,
		amount: 125000,
		notificationMethod: NotificationMethod.SMS,
		status: SubscriptionStatus.CANCELLED,
		createdAt: '2024-01-01',
		updatedAt: '2024-01-01',
	},
];
