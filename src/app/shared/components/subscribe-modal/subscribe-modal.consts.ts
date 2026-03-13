import { NotificationMethod } from "@core/models";

export const notificationMethods = [
    { value: NotificationMethod.EMAIL, label: 'Correo electrónico' },
    { value: NotificationMethod.SMS, label: 'Mensaje de texto (SMS)' },
];