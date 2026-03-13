import { NotificationMethod } from '../models';

export const MESSAGES = {
	ERROR: {
		USER_NOT_FOUND: 'Usuario no encontrado',
		SUBSCRIPTION_NOT_FOUND: 'Suscripción no encontrada',
		SUBSCRIPTION_ALREADY_CANCELLED: 'Esta suscripción ya fue cancelada',
		SUBSCRIPTION_ALREADY_EXISTS: 'Ya tienes una suscripción activa a este fondo',
		INSUFFICIENT_BALANCE: (balance: number) =>
			`Saldo insuficiente. Tu saldo actual es $${balance.toLocaleString('es-CO')} COP`,
	},
	SUCCESS: {
		SUBSCRIPTION_CREATED: (method: NotificationMethod) =>
			`Suscripción exitosa. Se enviará notificación por ${method === NotificationMethod.EMAIL ? 'correo electrónico' : 'SMS'}`,
		SUBSCRIPTION_CANCELLED: (amount: number) =>
			`Suscripción cancelada. Se ha reembolsado $${amount.toLocaleString('es-CO')} COP a tu saldo`,
	},
} as const;
