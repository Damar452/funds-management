import { Fund, NotificationMethod } from './index';

export interface SubscribeData {
	fund: Fund;
	amount: number;
	notificationMethod: NotificationMethod;
}
